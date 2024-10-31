import { MORSE_CODE_ALPHABET } from "@/constants";
import { PlayArrow, Stop } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

const DIT = 100;
const DAH = DIT * 3;
const PAUSE_BETWEEN_SECONDS = DIT;
const PAUSE_BETWEEN_LETTERS = DIT * 3;
const PAUSE_BETWEEN_WORDS = DIT * 7;

interface IProps {
  originalText: string;
}

export default function MorsePlayer({ originalText }: IProps) {
  const audioContext = useRef<AudioContext>();
  const shouldStop = useRef(false);
  const currentPosition = useRef(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeTimers = useRef<number[]>([]);

  const cleanup = useCallback(() => {
    activeTimers.current.forEach((timerId) => window.clearTimeout(timerId));
    activeTimers.current = [];

    if (audioContext.current?.state !== "closed") {
      audioContext.current?.close();
    }
  }, []);

  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  const sleep = useCallback((ms: number) => {
    return new Promise<void>((resolve) => {
      const timerId = window.setTimeout(() => {
        resolve();
        activeTimers.current = activeTimers.current.filter(
          (id) => id !== timerId
        );
      }, ms);
      activeTimers.current.push(timerId);
    });
  }, []);

  const playSound = useCallback((duration: number) => {
    return new Promise<void>((resolve, reject) => {
      if (shouldStop.current) {
        resolve();
        return;
      }

      if (!audioContext.current) {
        reject(new Error("No audio context"));
        return;
      }

      const oscillator = audioContext.current.createOscillator();
      const gainNode = audioContext.current.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(
        600,
        audioContext.current.currentTime
      );

      gainNode.gain.setValueAtTime(0, audioContext.current.currentTime);
      gainNode.gain.linearRampToValueAtTime(
        1,
        audioContext.current.currentTime + 0.01
      );

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.current.destination);

      oscillator.start();

      const cleanupSound = () => {
        try {
          oscillator.stop();
          oscillator.disconnect();
          gainNode.disconnect();
        } catch (error) {
          console.error("Error cleaning up sound:", error);
        }
      };

      const fadeOutTimerId = window.setTimeout(() => {
        if (audioContext.current) {
          gainNode.gain.linearRampToValueAtTime(
            0,
            audioContext.current.currentTime + 0.01
          );

          const cleanupTimerId = window.setTimeout(() => {
            cleanupSound();
            resolve();
            activeTimers.current = activeTimers.current.filter(
              (id) => id !== fadeOutTimerId && id !== cleanupTimerId
            );
          }, 20);

          activeTimers.current.push(cleanupTimerId);
        }
      }, duration);

      activeTimers.current.push(fadeOutTimerId);

      if (audioContext.current) {
        audioContext.current.onstatechange = () => {
          if (audioContext.current?.state === "closed") {
            cleanupSound();
          }
        };
      }
    });
  }, []);

  const playLetter = useCallback(
    async (letter: string) => {
      for (let i = 0; i < letter.length; i++) {
        if (shouldStop.current) return;
        await playSound(letter[i] === "." ? DIT : DAH);
        await sleep(PAUSE_BETWEEN_SECONDS);
      }
    },
    [playSound, sleep]
  );

  const playMorse = useCallback(
    async (text: string) => {
      try {
        audioContext.current = new window.AudioContext();

        for (let i = currentPosition.current; i < text.length; i++) {
          if (shouldStop.current) {
            currentPosition.current = i;
            return;
          }

          if (text[i] === " ") {
            await sleep(PAUSE_BETWEEN_WORDS);
          } else if (
            MORSE_CODE_ALPHABET[text[i] as keyof typeof MORSE_CODE_ALPHABET]
          ) {
            await playLetter(
              MORSE_CODE_ALPHABET[text[i] as keyof typeof MORSE_CODE_ALPHABET]
            );
            await sleep(PAUSE_BETWEEN_LETTERS);
          }
        }
      } catch (error) {
        console.error("Error playing morse code:", error);
      } finally {
        setIsPlaying(false);
        cleanup();
      }
    },
    [playLetter, sleep, cleanup]
  );

  const startPlaying = useCallback(
    async (text: string) => {
      if (isPlaying) {
        shouldStop.current = true;
        cleanup();
        await sleep(100);
      }

      setIsPlaying(true);
      shouldStop.current = false;
      currentPosition.current = 0;

      playMorse(text);
    },
    [isPlaying, playMorse, sleep, cleanup]
  );

  const stopPlaying = useCallback(() => {
    shouldStop.current = true;
    setIsPlaying(false);
    cleanup();
  }, [cleanup]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      stopPlaying();
    } else {
      startPlaying(originalText);
    }
  }, [isPlaying, stopPlaying, startPlaying, originalText]);

  return (
    <Button
      color={isPlaying ? "secondary" : "success"}
      onClick={togglePlay}
      disabled={originalText.trim().length === 0}
    >
      {isPlaying ? (
        <Stop sx={{ marginRight: 0.5 }} />
      ) : (
        <PlayArrow sx={{ marginRight: 0.5 }} />
      )}
      <span>{isPlaying ? "Stop" : "Play"}</span>
    </Button>
  );
}
