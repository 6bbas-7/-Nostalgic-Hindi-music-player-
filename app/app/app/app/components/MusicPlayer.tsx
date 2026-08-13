"use client";

import { useState, useRef, useEffect } from "react";
import { PlaylistData } from "@/types/playlist";

const PLAYLIST: PlaylistData[] = [
  {
    id: "1",
    title: "Chalekar Mere Maan Ko",
    artist: "Rajendra Mehta",
    key: "D Major",
    duration: 245,
  },
  {
    id: "2",
    title: "Hai Apna Dil Khoya",
    artist: "Geeta Dutt",
    key: "A Major",
    duration: 198,
  },
  {
    id: "3",
    title: "Yeh Dil Iske Baishara",
    artist: "Kishore Kumar",
    key: "D Major",
    duration: 215,
  },
  {
    id: "4",
    title: "Kya Hua Tera Wada",
    artist: "Mohammad Rafi",
    key: "C Major",
    duration: 267,
  },
  {
    id: "5",
    title: "Tumko Dekha To Khayali Aya",
    artist: "Lata Mangeshkar",
    key: "D Major",
    duration: 185,
  },
  {
    id: "6",
    title: "Rafi Rafi In Khwaab Me Aayi",
    artist: "Mohammad Rafi",
    key: "A Major",
    duration: 223,
  },
  {
    id: "7",
    title: "Main Kya Karun Tere Bina",
    artist: "Asha Parekh",
    key: "C Major",
    duration: 256,
  },
  {
    id: "8",
    title: "Mehbooba Mehbooba",
    artist: "Amitabh Bachchan",
    key: "F Major",
    duration: 234,
  },
];

export function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= currentTrack.duration) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration]);

  useEffect(() => {
    setDuration(currentTrack.duration);
    setProgress(0);
  }, [currentTrackIndex, currentTrack.duration]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const handlePrev = () => {
    if (progress > 3) {
      setProgress(0);
    } else {
      setCurrentTrackIndex((prev) =>
        prev === 0 ? PLAYLIST.length - 1 : prev - 1
      );
      setProgress(0);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min((x / rect.width) * duration, duration));
    setProgress(newProgress);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercent = (progress / duration) * 100;

  return (
    <>
      <div className="hidden sm:flex">
        <div className="player-glass player-glow w-full max-w-3xl rounded-full p-3 pr-5 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0">
              <div
                className={`h-20 w-20 rounded-full border-2 border-white/20 bg-gradient-to-br from-accent/40 to-accent/10 shadow-inner transition-all ${
                  isPlaying ? "animate-vinyl" : "pause-vinyl"
                }`}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="h-3 w-3 rounded-full bg-black/70 ring-2 ring-white/40" />
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="truncate text-sm font-semibold text-white">
                {currentTrack.title}
              </h2>
              <p className="truncate text-xs text-white/70">{currentTrack.artist}</p>

              <div className="group mt-2 space-y-1">
                <div
                  className="seek-track"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Track progress"
                  aria-valuenow={Math.round(progressPercent)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  tabIndex={0}
                >
                  <div
                    className="seek-fill"
                    style={{ width: `${progressPercent}%` }}
                  >
                    <div
                      className="seek-thumb"
                      style={{ right: "-6px" }}
                    />
                  </div>
                </div>
                <div className="flex justify-between text-xs tabular-nums text-white/50">
                  <span>{formatTime(progress)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handlePrev}
                aria-label="Previous track"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
                </svg>
              </button>

              <button
                onClick={handlePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2.5 rounded-full bg-accent/90 hover:bg-accent transition-colors text-black shadow-lg"
              >
                {isPlaying ? (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={handleNext}
                aria-label="Next track"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 18h2V6h-2v12zm-11-7l8.5-6v12l-8.5-6z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:hidden w-full max-w-sm flex-col">
        <div className="player-glass player-glow space-y-4 rounded-2xl p-4 shadow-2xl">
          <div className="flex justify-center">
            <div className="relative h-24 w-24">
              <div
                className={`h-24 w-24 rounded-full border-2 border-white/20 bg-gradient-to-br from-accent/40 to-accent/10 shadow-inner transition-all ${
                  isPlaying ? "animate-vinyl" : "pause-vinyl"
                }`}
              >
                <div className="flex items-center justify-center h-full">
                  <div className="h-3 w-3 rounded-full bg-black/70 ring-2 ring-white/40" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-1 text-center">
            <h2 className="line-clamp-2 text-base font-semibold text-white">
              {currentTrack.title}
            </h2>
            <p className="text-sm text-white/70">{currentTrack.artist}</p>
            <p className="text-xs text-white/50">{currentTrack.key}</p>
          </div>

          <div className="group space-y-2">
            <div
              className="seek-track"
              onClick={handleSeek}
              role="slider"
              aria-label="Track progress"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
            >
              <div
                className="seek-fill"
                style={{ width: `${progressPercent}%` }}
              >
                <div className="seek-thumb" style={{ right: "-6px" }} />
              </div>
            </div>
            <div className="flex justify-between text-xs tabular-nums text-white/50">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={handlePrev}
              aria-label="Previous track"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
              </svg>
            </button>

            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-3 rounded-full bg-accent/90 hover:bg-accent transition-colors text-black shadow-lg"
            >
              {isPlaying ? (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            <button
              onClick={handleNext}
              aria-label="Next track"
              className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/70 hover:text-white"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 18h2V6h-2v12zm-11-7l8.5-6v12l-8.5-6z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <audio ref={audioRef} />
    </>
  );
                                    }
