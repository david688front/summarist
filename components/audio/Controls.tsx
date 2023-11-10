import { Forward10Outlined, Replay10Outlined } from "@mui/icons-material";
import { User } from "firebase/auth";
import React, { useCallback, useEffect, useRef } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

interface Props {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  progressBarRef: React.MutableRefObject<HTMLInputElement | null>;
  duration: number;
  setTimeProgress: React.Dispatch<React.SetStateAction<number>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
}

function Controls({
  audioRef,
  progressBarRef,
  duration,
  setTimeProgress,
  isPlaying,
  setIsPlaying,
  user,
}: Props) {
  const playAnimationRef = useRef<number | null>(null);

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    if (audioRef.current) {
      const currentTime = audioRef.current.currentTime;
      setTimeProgress(currentTime);

      // Convert currentTime to a string before assigning it to value
      progressBarRef.current!.value = currentTime.toString();

      progressBarRef.current!.style.setProperty(
        "--range-progress",
        `${(currentTime / duration) * 100}%`
      );

      playAnimationRef.current = requestAnimationFrame(repeat);
    }
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 10;
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime -= 10;
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
      playAnimationRef.current = requestAnimationFrame(repeat);
    } else {
      audioRef.current?.pause();
      cancelAnimationFrame(playAnimationRef.current!);
    }
  }, [isPlaying, audioRef, repeat]);

  return (
    <div className="audio__controls--wrapper">
      <div className="audio__controls">
        <button
          className="audio__controls--btn"
          onClick={skipBackward}
          disabled={!user}
        >
          <Replay10Outlined />
        </button>
        <button
          className="audio__controls--btn audio__controls--btn-play"
          onClick={togglePlayPause}
          disabled={!user}
        >
          {isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}
        </button>
        <button
          className="audio__controls--btn"
          onClick={skipForward}
          disabled={!user}
        >
          <Forward10Outlined />
        </button>
      </div>
    </div>
  );
}

export default Controls;
