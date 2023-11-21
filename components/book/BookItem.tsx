import { useEffect, useState } from "react";
import Link from "next/link";
import { getStripeCusId, hasSubscription } from "@/stripe/libstripe";
import { DocumentData } from "@firebase/firestore";
import { BookObject } from "@/BookObject";
import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import useAudio from "@/hooks/useAudio";
import useAuth from "@/hooks/useAuth";


interface Props {
  book: BookObject | DocumentData;
}

function BookItem({ book }: Props) {
  const { user } = useAuth();
  const [IsPremium, setIsPremium] = useState(false);

  async function fetchSubscription() {
   // setLoading(true);
    try {
      const cus_id = await getStripeCusId(String(user?.email));
      // has subscription
      const hasSub = await hasSubscription(String(cus_id));
      if(hasSub !== "no")
        setIsPremium(true);
    } catch (error) {
      console.log(error);
    } finally {
      //setLoading(false);
    }
  }
  useEffect(() => {
    fetchSubscription();
  }, []);


  const { duration, formatTime, audioRef, onLoadedMetadata } = useAudio(
    book?.audioLink || ""
  );

  return (
    <Link href={`/book/${book.id}`} key={book.id} className="for-you__recommended--books-link">
        {((!user && book.subscriptionRequired) ||
          (book.subscriptionRequired && IsPremium === false)) && (
          <div className="book__pill book__pill--subscription-required">Premium</div>
        )}
        <audio
          src={book.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        <figure className="book__image--wrapper" style={{marginBottom: '8px'}}>
          <img src={book.imageLink} alt="Book" className="book__image" style={{display: 'block'}}/>
        </figure>
        <div className="recommended__book--title">{book.title}</div>
        <div className="recommended__book--author">{book.author}</div>
        <div className="recommended__book--sub-title">{book.subTitle}</div>
        <div className="recommended__book--details-wrapper">
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <BiTimeFive className="recommended__book--details-icon" />
            </div>
            <div className="recommended__book--details-text">
              {formatTime(duration).formatMinutes}:
              {formatTime(duration).formatSeconds}
            </div>
          </div>
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <AiOutlineStar className="recommended__book--details-icon" />
            </div>
            <div className="recommended__book--details-text">
              {book.averageRating}
            </div>
          </div>
        </div>
    </Link>
  );
}
export default BookItem;
