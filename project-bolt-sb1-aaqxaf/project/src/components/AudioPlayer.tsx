import React, { useRef, useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  url: string;
  title: string;
  artist: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, title, artist }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg text-white">
      <audio ref={audioRef} src={url} />
      <div className="flex flex-col gap-2">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-gray-400">{artist}</p>
        </div>
        <div className="flex items-center justify-center gap-4">
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="p-3 bg-green-500 hover:bg-green-600 rounded-full"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button className="p-2 hover:bg-gray-700 rounded-full">
            <SkipForward size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Volume2 size={20} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;