import Summary from "@/components/book/Summary";
import AudioPlayer from "@/components/player/AudioPlayer";
import SearchBar from "@/components/library/SearchBar";
import Sidebar from "@/components/library/Sidebar";
import useAuth from "@/hooks/useAuth";
import { audioPlayerOpen } from "@/redux/audioPlayerSlice";
import { BookObject } from "@/BookObject";
import requests from "@/utils/requests";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch } from "react-redux";

function BookAudio() {
  const [bookSummary, setBookSummary] = useState<BookObject | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { id } = router.query;
  const { user } = useAuth();

  const dispatch = useDispatch();

  async function fetchAudioBook() {
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
    fetchAudioBook();
    dispatch(audioPlayerOpen());
  }, [id, user?.uid]);

  return (
      <div className="wrapper">
        <SearchBar />
        <Sidebar />
        {loading ? (
          <AiOutlineLoading3Quarters className="loading__icon" />
        ) : (
          <Summary {...{ bookSummary }} />
        )}
        <AudioPlayer book={bookSummary} />
      </div>
  );
}

export default BookAudio;
