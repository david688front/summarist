import useAuth from "@/hooks/useAuth";
import { audioPlayerOpen } from "@/redux/audioPlayerSlice";
import { BookObject } from "@/BookObject";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import Controls from "./Controls";
import DisplayTrack from "./DisplayTrack";
import ProgressBar from "./ProgressBar";

interface Props {
  book: BookObject | null;
}

function AudioPlayer({ book }: Props) {
  const { user } = useAuth();
  const dispatch = useDispatch();

  const [timeProgress, setTimeProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);

      if (progressBarRef.current) {
        progressBarRef.current.max = seconds.toString();
      }
    }
  };

  const handleAudioEnded = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setTimeProgress(0);
      progressBarRef.current!.value = "0";
      progressBarRef.current!.style.setProperty("--range-progress", "0%");
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    dispatch(audioPlayerOpen());
  }, []);

  return (
    <div className="audio__wrapper">
      <audio
        src={book?.audioLink}
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={handleAudioEnded}
      ></audio>

      <DisplayTrack {...{ book }} />

      <Controls
        {...{
          audioRef,
          progressBarRef,
          duration,
          setTimeProgress,
          isPlaying,
          setIsPlaying,
          user,
        }}
      />
      <ProgressBar
        {...{
          progressBarRef,
          audioRef,
          timeProgress,
          duration,
          audioLink: book?.audioLink,
        }}
      />
    </div>
  );
}
export default AudioPlayer;
