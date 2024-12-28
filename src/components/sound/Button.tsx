import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { useStore } from "../../context";
import "../../styles/sound.css";
import { useEffect, useRef } from "react";

const Button = () => {
  const { sound, setSound } = useStore();

  const audioRef = useRef<HTMLAudioElement|null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/bgmusic.mp3");
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(() => {
      console.log("Audio playback blocked");
    });
  }, []);

  const handlePlay = () => {
    setSound(true);
    if (!audioRef.current) {
      audioRef.current = new Audio("/audio/bgmusic.mp3");
      audioRef.current.loop = true;
    }
    audioRef.current.play().catch(() => {
      console.log("Audio playback blocked");
    });
  };

  const handleStop = () => {
    setSound(false);
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset to the start
    }
  };

  if (sound) {
    return (
      <button id="audioStopButton" className="sound-btn" onClick={handleStop}>
        <CiVolumeHigh size={30} />
      </button>
    );
  }
  return (
    <button id="audioPlayButton" className="sound-btn" onClick={handlePlay}>
      <CiVolumeMute size={30} />
    </button>
  );
};

export default Button;
