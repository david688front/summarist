import Authentication from "@/components/Authen";
import SummaryBookSkeleton from "@/components/book/Skeleton/SummaryBookSkeleton";
import SummaryBook from "@/components/book/SummaryBook";
import SearchBar from "@/components/library/SearchBar";
import Sidebar from "@/components/library/Sidebar";
import useAudio from "@/hooks/useAudio";
import { RootState } from "@/redux/modalStore";
import { Book } from "@/types";
import requests from "@/utils/requests";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function BookDetail() {
  const modal = useSelector((state: RootState) => state.modal.value);

  const router = useRouter();
  const { id } = router.query;

  const [bookSummary, setBookSummary] = useState<Book | null>(null);
  const [loading, setLoading] = useState(false);

  const { duration, formatTime, audioRef, onLoadedMetadata } = useAudio(
    bookSummary?.audioLink || ""
  );
  const { formatMinutes, formatSeconds } = formatTime(duration);

  async function fetchBook() {
    setLoading(true);
    try {
      const getBookResponse = (
        await axios.get(requests.fetchBook(id as string))
      ).data;
      setBookSummary(getBookResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBook();
  }, [id]);

  return (
    
      <div className="wrapper">
        {modal && <Authentication />}
        <SearchBar />
        <Sidebar />
        {loading ? (
          <SummaryBookSkeleton />
        ) : (
          <SummaryBook
            {...{
              bookSummary,
              formatMinutes,
              formatSeconds,
              audioRef,
              onLoadedMetadata,
            }}
          />
        )}
      </div>
  );
}
export default BookDetail;
