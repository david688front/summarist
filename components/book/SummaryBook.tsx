import app, { db } from "@/firebase";
import useAuth from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { modalOpen } from "@/redux/modalSlice";
import { BookObject } from "@/BookObject";
import {collection,setDoc,doc,deleteDoc,onSnapshot,DocumentData} from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineAudio, AiOutlineRead, AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { BsBookmark, BsFillBookmarkCheckFill } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { useDispatch } from "react-redux";

interface Props {
  bookSummary: BookObject | null;
  formatMinutes: string;
  formatSeconds: string;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  onLoadedMetadata: () => void;
}

function SummaryBook({
  bookSummary,
  formatMinutes,
  formatSeconds,
  audioRef,
  onLoadedMetadata,
}: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useAuth();

  const auth = getAuth(app);
  const subscription = useSubscription(app);
  
  const [book, setBook] = useState<DocumentData | BookObject | null>(
    bookSummary || null
  );
  const [bookList, setBookList] = useState<DocumentData[] | BookObject[]>([]);
  const [addedToList, setAddedToList] = useState(false);



  useEffect(() => {
    if (!book) return;

    if (user) {
      return onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => setBookList(snapshot.docs)
      );
    }
  }, [db, book?.id]);


  useEffect(() => {
    if (bookList && book && book.id) {
      setAddedToList(
        bookList.findIndex((result) => result.data().id === book.id) !== -1
      );
    }
  }, [bookList]);

  const handleList = async () => {
    if (user && book && book.id) {
      if (addedToList) {
        await deleteDoc(
          doc(db, "customers", user!.uid, "myList", book?.id.toString())
        );
      } else {
        await setDoc(
          doc(db, "customers", user!.uid, "myList", book?.id.toString()),
          {
            ...book,
          }
        );
      }
    }else{
     
        dispatch(modalOpen());
      
    }
  };

  const noUserHandler = () => {
    if (!user) {
      dispatch(modalOpen());
    } else if (
      bookSummary?.subscriptionRequired &&
      subscription.isActive === false
    ) {
      return (window.location.href = "/choose-plan");
    } else {
      router.push(`/player/${bookSummary?.id}`);
    }
  };

  return (
    <div className="row">
      <audio
        src={bookSummary?.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <div className="container">
        <div className="inner__wrapper">
          <div className="inner__book">

            <div className="inner-book__title">{bookSummary?.title}</div>
            <div className="inner-book__author">
              {bookSummary?.author}
            </div>
            <div className="inner-book__subtitle">
              {bookSummary?.subTitle}
            </div>

            <div className="inner-book__wrapper">
              <div className="inner-book__description--wrapper">
                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineStar />
                  </div>
                  <div className="inner-book__overall--rating">
                    {bookSummary?.averageRating}{" "}
                  </div>
                  <div className="inner-book__total--rating">
                    ({bookSummary?.totalRating})
                  </div>
                </div>

                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <BiTimeFive />
                  </div>
                  <div className="inner-book__duration">
                    {formatMinutes}:{formatSeconds}
                  </div>
                </div>

                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <AiOutlineAudio />
                  </div>
                  <div className="inner-book__type">{bookSummary?.type}</div>
                </div>

                <div className="inner-book__description">
                  <div className="inner-book__icon">
                    <HiOutlineLightBulb />
                  </div>
                  <div className="inner-book__key--ideas">
                    {bookSummary?.keyIdeas} Key Ideas
                  </div>
                </div>
              </div>
            </div>

            <div className="inner-book__read--btn-wrapper">
              <button
                className="inner-book__read--btn"
                onClick={() => {
                  noUserHandler();
                }}
              >
                <div className="inner-book__read--icon">
                  <AiOutlineRead />
                </div>
                <div className="inner-book__read--text">Read</div>
              </button>

              <button
                className="inner-book__read--btn"
                onClick={() => {
                  noUserHandler();
                }}
              >
                <div className="inner-book__read--icon">
                  <AiOutlineAudio />
                </div>
                <div className="inner-book__read--text">Listen</div>
              </button>
            </div>

            <div className="inner-book__bookmark" onClick={handleList}>
              {addedToList ? (
                <>
                  <div className="bookmark__icon">
                    <BsFillBookmarkCheckFill />
                  </div>
                </>
              ) : (
                <>
                  <div className="bookmark__icon">
                    <BsBookmark />
                  </div>
                  <div className="inner-book__bookmark--text">
                    Add title to My Library
                  </div>
                </>
              )}
            </div>

            <h2 className="inner-book__secondary--title">{"What's"} it about?</h2>

            <div className="inner-book__tags--wrapper">
              {bookSummary &&
                bookSummary.tags.map((tag, index) => (
                  <div className="inner-book__tag" key={index}>
                    {tag}
                  </div>
                ))}
            </div>

            <div className="inner-book__book--description">
              {bookSummary?.bookDescription}
            </div>

            <h2 className="inner-book__secondary--title">About the author</h2>

            <div className="inner-book__author--description">
              {bookSummary?.authorDescription}
            </div>
          </div>

          <div className="inner-book--img-wrapper">

            <figure className="book__image--wrapper" style={{ height: '300px', width: '300px', minWidth: '300px' }}>
              <img
                className="book__image"
                src={bookSummary?.imageLink}
                alt="book"
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SummaryBook;
