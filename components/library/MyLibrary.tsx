import { Book } from "@/types";
import { DocumentData } from "@firebase/firestore";
import BooksCard from "../book/BooksCard";

interface Props {
  list: (Book | DocumentData)[];
}

function MyLibrary({ list }: Props) {
  return (
    <div className="row">
      <div className="container">
        <div className="section__header__title">Saved Books</div>
        <div className="selected__book--subtitle">
          {list.length === 1 ? `${list.length} item` : `${list.length} items`}
        </div>
        <BooksCard books={list} />

        {list.length === 0 && (
          <div className="finished__books--block-wrapper">
            <div className="finished__books--title">
              Save your favorite books!
            </div>
            <div className="finished__books--sub-title">
              When you save a book, it will appear here.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default MyLibrary;
