"use client";

import { MatchingGame } from "@/components/gamification/MatchingGame";

const samplePairs = [
  { id: "1", left: "Der Apfel", right: "The Apple" },
  { id: "2", left: "Das Auto", right: "The Car" },
  { id: "3", left: "Die Katze", right: "The Cat" },
  { id: "4", left: "Das Haus", right: "The House" },
];

export default function PracticePage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Practice Zone</h1>
        <p className="text-muted-foreground">Complete interactive exercises to earn XP.</p>
      </div>

      <div className="mt-8">
        <MatchingGame 
          pairs={samplePairs} 
          onComplete={() => alert("You won! +50 XP")} 
        />
      </div>
    </div>
  );
}
