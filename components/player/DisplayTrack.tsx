import { BookObject } from "@/BookObject";

interface Props {
  book: BookObject | null;
}

function DisplayTrack({ book }: Props) {
  return (
    <div className="audio__track--wrapper">
      {!book ? (
        <>
          <figure className="audio__track--image-mask">
            <div style={{backgroundColor:'#f4f4f4',width:'48px',height:'48px'}}></div>

          </figure>
          <div className="audio__track--details-wrapper">
            <div style={{backgroundColor:'#f4f4f4',width:'48px',height:'48px'}}></div>
          </div>
        </>
      ) : (
        <>
          <figure className="audio__track--image-mask">
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
