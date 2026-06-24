import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  speed?: number;   // ms per character
  delay?: number;   // delay before start
}

/**
 * Typewriter effect for a given text. Returns the visible substring,
 * whether it's done, and a `skip` function to instantly reveal.
 *
 * The text resets and re-types whenever `text` changes.
 */
export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 22, delay = 0 } = options;
  const [output, setOutput] = useState("");
  const [done, setDone] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    setOutput("");
    setDone(false);

    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (!text) {
      setDone(true);
      return;
    }

    let index = 0;
    const startTimeout = window.setTimeout(() => {
      timerRef.current = window.setInterval(() => {
        index += 1;
        if (index >= text.length) {
          setOutput(text);
          setDone(true);
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
        } else {
          setOutput(text.slice(0, index));
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [text, speed, delay]);

  const skip = () => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setOutput(text);
    setDone(true);
  };

  return { output, done, skip };
}
