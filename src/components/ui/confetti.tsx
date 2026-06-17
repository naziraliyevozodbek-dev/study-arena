"use client";

import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

export function Confetti({ active, duration = 3000 }: { active: boolean, duration?: number }) {
  const [show, setShow] = useState(false);
  const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (active) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  if (!show) return null;

  return (
    <ReactConfetti
      width={windowDimension.width}
      height={windowDimension.height}
      recycle={false}
      numberOfPieces={500}
      gravity={0.2}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
    />
  );
}
