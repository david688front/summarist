import app from "@/firebase";
import useAudio from "@/hooks/useAudio";
import useAuth from "@/hooks/useAuth";
import { useSubscription } from "@/hooks/useSubscription";
import { Book } from "@/types";
import { DocumentData } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import Link from "next/link";
import { AiOutlineStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";

interface Props {
  book: Book | DocumentData;
}

function BookItem({ book }: Props) {
  const { user } = useAuth();
  const subscription = useSubscription(app);
  const auth = getAuth(app);

  const { duration, formatTime, audioRef, onLoadedMetadata } = useAudio(
    book?.audioLink || ""
  );

  return (
    <Link className="for-you__recommended--books-link" href={`/book/${book.id}`} key={book.id}>
      
        {((!user && book.subscriptionRequired) ||
          (book.subscriptionRequired && subscription.isActive === false)) && (
          <div className="book__pill book__pill--subscription-required">Premium</div>
        )}
        <audio
          src={book.audioLink}
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        <figure className="book__image--wrapper" style={{marginBottom: "8px"}}>
          <img src={book.imageLink} alt="Book" className="book__image" />
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
