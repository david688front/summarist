import { Book } from "@/types";
import SearchBookItem from "./SearchBookItem";

interface Props {
  books: Book[];
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
