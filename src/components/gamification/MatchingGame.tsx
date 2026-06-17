"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Confetti } from "@/components/ui/confetti";
import { CheckCircle, XCircle } from "lucide-react";

interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export function MatchingGame({ pairs, onComplete }: { pairs: MatchPair[], onComplete?: () => void }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [errorIds, setErrorIds] = useState<{left: string, right: string} | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const leftItems = pairs.map(p => ({ id: p.id, text: p.left })).sort(() => Math.random() - 0.5);
  // Need to use useMemo or useEffect for sorting so hydration matches, but for simplicity we'll just sort here. 
  // Warning: in real app, sort in useEffect or keep consistent across SSR to avoid hydration mismatch.
  const [rightItems] = useState(() => [...pairs.map(p => ({ id: p.id, text: p.right }))].sort(() => Math.random() - 0.5));
  const [leftItemsState] = useState(() => leftItems);

  const handleLeftClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedLeft(id);
    checkMatch(id, selectedRight);
  };

  const handleRightClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    setSelectedRight(id);
    checkMatch(selectedLeft, id);
  };

  const checkMatch = (leftId: string | null, rightId: string | null) => {
    if (!leftId || !rightId) return;

    if (leftId === rightId) {
      // Match found!
      setMatchedIds(prev => {
        const newMatched = [...prev, leftId];
        if (newMatched.length === pairs.length) {
          setShowConfetti(true);
          if (onComplete) setTimeout(onComplete, 2000);
        }
        return newMatched;
      });
      setSelectedLeft(null);
      setSelectedRight(null);
      setErrorIds(null);
    } else {
      // Mismatch
      setErrorIds({ left: leftId, right: rightId });
      setTimeout(() => {
        setSelectedLeft(null);
        setSelectedRight(null);
        setErrorIds(null);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 border-2 border-border rounded-3xl bg-surface shadow-sm relative">
      <Confetti active={showConfetti} />
      
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Match the pairs!</h3>
        <p className="text-muted-foreground">Tap the matching items on both sides.</p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="flex flex-col gap-4">
          {leftItemsState.map((item) => {
            const isSelected = selectedLeft === item.id;
            const isMatched = matchedIds.includes(item.id);
            const isError = errorIds?.left === item.id;

            return (
              <motion.button
                key={`l-${item.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleLeftClick(item.id)}
                disabled={isMatched}
                className={`p-4 rounded-2xl border-b-4 text-center font-bold transition-colors ${
                  isMatched 
                    ? "bg-green-100 border-green-200 text-green-400 opacity-50 cursor-not-allowed" 
                    : isError
                      ? "bg-destructive/20 border-destructive text-destructive"
                      : isSelected 
                        ? "bg-secondary/20 border-secondary text-secondary" 
                        : "bg-background border-border hover:bg-muted text-foreground"
                }`}
              >
                {item.text}
              </motion.button>
            )
          })}
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          {rightItems.map((item) => {
            const isSelected = selectedRight === item.id;
            const isMatched = matchedIds.includes(item.id);
            const isError = errorIds?.right === item.id;

            return (
              <motion.button
                key={`r-${item.id}`}
                whileHover={!isMatched ? { scale: 1.02 } : {}}
                whileTap={!isMatched ? { scale: 0.98 } : {}}
                onClick={() => handleRightClick(item.id)}
                disabled={isMatched}
                className={`p-4 rounded-2xl border-b-4 text-center font-bold transition-colors ${
                  isMatched 
                    ? "bg-green-100 border-green-200 text-green-400 opacity-50 cursor-not-allowed" 
                    : isError
                      ? "bg-destructive/20 border-destructive text-destructive"
                      : isSelected 
                        ? "bg-secondary/20 border-secondary text-secondary" 
                        : "bg-background border-border hover:bg-muted text-foreground"
                }`}
              >
                {item.text}
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  );
}
