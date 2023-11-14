import { BookObject } from "@/BookObject";
import { BsPlayFill } from "react-icons/bs";
import BooksCard from "../book/BooksCard";
import useAudio from "@/hooks/useAudio";
import Link from "next/link";

interface Props {
  selectedBook: BookObject | null;
  recommendedBooks: BookObject[];
  suggestedBooks: BookObject[];
}

function SelectedBooks({
  selectedBook,
  recommendedBooks,
  suggestedBooks,
}: Props) {
  const { duration, formatTime, audioRef, onLoadedMetadata } = useAudio(
    selectedBook?.audioLink || ""
  );

  return (
    <div className="row">
      <div className="container">
        <div className="for-you__wrapper">
          <div className="for-you__title">Selected just for you</div>
          <audio
            src={selectedBook?.audioLink}
            ref={audioRef}
            onLoadedMetadata={onLoadedMetadata}
          ></audio>
          <Link href="" className="selected__book">
            <div className="selected__book--sub-title">
              {selectedBook?.subTitle}
            </div>
            <div className="selected__book--line"></div>
            <div className="selected__book--content">
              <figure className="book__image--wrapper">
                <img
                  src={selectedBook?.imageLink}
                  alt="Book"
                  className="book__image"
                />
              </figure>
              <div className="selected__book--info">
                <div className="selected__book--title">
                  {selectedBook?.title}
                </div>
                <div className="selected__book--author">
                  {selectedBook?.author}
                </div>
                <div className="selected__book--duration-wrapper">
                  <div className="selected__book--icon">
                    <BsPlayFill className="play--icon" />
                  </div>
                  <div className="selected__book--duration">
                    {formatTime(duration).formatMinutes} mins {formatTime(duration).formatSeconds} sec
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div>
            <div className="for-you__title">Recommended For You</div>
            <div className="for-you__sub--title">
              We think {"you’ll"} like these
            </div>
            <BooksCard books={recommendedBooks} />
          </div>
          <div>
            <div className="for-you__title">Suggested Books</div>
            <div className="for-you__sub--title">Browse those books</div>
            <BooksCard books={suggestedBooks} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default SelectedBooks;