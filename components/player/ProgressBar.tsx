import useAudio from "@/hooks/useAudio";
import React, { ChangeEvent } from "react";
interface Props {
  progressBarRef: React.RefObject<HTMLInputElement>;
  audioRef: React.RefObject<HTMLAudioElement>;
  timeProgress: number;
  duration: number;
  audioLink?: string | null;
}
function ProgressBar({
  progressBarRef,
  audioRef,
  timeProgress,
  duration,
  audioLink,
}: Props) {
  const handleProgressChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const currentTime = parseFloat(event.target.value);
      audioRef.current.currentTime = currentTime;
    }
  };
  const { formatTime } = useAudio(audioLink || "");
  return (
    <div className="audio__progress--wrapper">
      <div className="audio__time">
        {formatTime(timeProgress).formatMinutes}:
        {formatTime(timeProgress).formatSeconds}
      </div>
      <input
        className="audio__progress--bar"
        type="range"
        ref={progressBarRef}
        defaultValue={String(timeProgress)}
        onChange={handleProgressChange}
      />
      <div className="audio__time">
        {formatTime(duration).formatMinutes}:
        {formatTime(duration).formatSeconds}
      </div>
    </div>
  );
}
export default ProgressBar;