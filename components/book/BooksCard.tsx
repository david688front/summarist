import { Book } from "@/types";
import BookItem from "./BookItem";
import { DocumentData } from "@firebase/firestore";

interface Props {
  books: Book[] | DocumentData[];
}

function BooksCard({ books }: Props) {
  return (
    <div className="for-you__recommended--books">
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BooksCard;