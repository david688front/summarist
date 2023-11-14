import useAudio from "@/hooks/useAudio";
import { BookObject } from "@/BookObject";
import Link from "next/link";
import { BiTimeFive } from "react-icons/bi";

interface Props {
  book: BookObject;
}

function SearchBookItem({ book }: Props) {
  const { duration, formatTime, audioRef, onLoadedMetadata } = useAudio(
    book?.audioLink || ""
  );

  return (
    <Link
      href={`/book/${book.id}`}
      className="search__book--link"
      key={book.id}
    >
      <audio
        src={book.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
      ></audio>
      <figure
        className="book__image--wrapper"
        style={{ height: "80px", width: "80px", minWidth: "80px" }}
      >
        <img src={book.imageLink} alt="book" className="book__image" />
      </figure>
      <div>
        <div className="search__book--title">{book.title}</div>
        <div className="search__book--author">{book.author}</div>
        <div className="search__book--duration">
          <div className="recommended__book--details">
            <div className="recommended__book--details-icon">
              <BiTimeFive />
            </div>
            <div className="recommended__book--details-text">
              {formatTime(duration).formatMinutes}:
              {formatTime(duration).formatSeconds}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
export default SearchBookItem;
