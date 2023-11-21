import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SearchBar from "@/components/library/SearchBar";
import SelectedBooks from "@/components/library/SelectedBooks";
import Authentication from "@/components/Authen";
import SelectedBookSkel from "@/components/skeleton/SelectedBookSkel";
import Sidebar from "@/components/library/Sidebar";
import requests from "@/request/requests";
import axios from "axios";
import { RootState } from "@/store/modalStore";
import { BookObject } from "@/BookObject";

const ForYou = () => {
  const modal = useSelector((state: RootState) => state.modal.value);
  const [loading, setLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState<BookObject | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<BookObject[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<BookObject[]>([]);

  async function fetchBooks() {
    setLoading(true);

    try {
      const selectedBookResponse = (await axios.get(requests.fetchSelectedBook))
        .data[0];
      const recommendedBooksResponse = (
        await axios.get(requests.fetchRecommendedBooks)
      ).data;
      const suggestedBooksResponse = (
        await axios.get(requests.fetchSuggestedBooks)
      ).data;

      setSelectedBook(selectedBookResponse);
      setRecommendedBooks(recommendedBooksResponse);
      setSuggestedBooks(suggestedBooksResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
      <div className="wrapper">
        {modal && <Authentication />}
        <SearchBar />
        <Sidebar />
        {loading ? (
          <SelectedBookSkel/>
        ) : (
          <SelectedBooks {...{ selectedBook, recommendedBooks, suggestedBooks }} />
        )}
      </div>
  );
};

export default ForYou;