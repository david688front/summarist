import { Book } from "@/types";
import Skeleton from "../book/Skeleton/Skeleton";

interface Props {
  book: Book | null;
}

function DisplayTrack({ book }: Props) {
  return (
    <div className="audio__track--wrapper">
      {!book ? (
        <>
          <figure className="audio__track--image-mask">
            <Skeleton width={"48px"} height={"48px"} />
          </figure>
          <div className="audio__track--details-wrapper">
            <Skeleton width={"89px"} height={"48px"} />
          </div>
        </>
      ) : (
        <>
          <figure className="book__image--wrapper">
            <img src={book?.imageLink} alt="" className="book__image" />
          </figure>
          <div className="audio__track--details-wrapper">
            <div className="audio__track--title">{book?.title}</div>
            <div className="audio__track--author">{book?.author}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default DisplayTrack;
