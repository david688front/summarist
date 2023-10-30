import { useEffect, useRef, useState } from "react";

interface Props {
  audioSrc: string;
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  duration: number;
}

function useAudio(audioSrc: string) {
  const [duration, setDuration] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(audioSrc);
    audioRef.current.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          onLoadedMetadata
        );
        audioRef.current.pause();
      }
    };
  }, [audioSrc]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
    }
  };

  const formatTime = (time: number) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      //   return `${formatMinutes}:${formatSeconds}`;
      return { formatMinutes, formatSeconds };
    }
    // return "00:00";
    return { formatMinutes: "00", formatSeconds: "00" };
  };

  return { duration, formatTime, audioRef, onLoadedMetadata };
}

export default useAudio;