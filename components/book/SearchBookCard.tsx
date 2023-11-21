import { BookObject } from "@/BookObject";
import SearchBookItem from "./SearchBookItem";

interface Props {
  books: BookObject[];
}

function SearchBookCard({ books }: Props) {
  return (
    <div className="search__books--wrapper">
      {books.map((book) => (
        <SearchBookItem key={book.id} book={book} />
      ))}
    </div>
  );
}
export default SearchBookCard;
