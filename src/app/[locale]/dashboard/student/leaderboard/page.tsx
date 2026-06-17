import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Medal } from "lucide-react";

export default function LeaderboardPage() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col items-center text-center gap-4 mb-8">
        <div className="p-4 bg-yellow-100 rounded-full">
          <Trophy className="h-12 w-12 text-yellow-500" />
        </div>
        <h1 className="text-3xl font-black tracking-tight">Weekly Leaderboard</h1>
        <p className="text-muted-foreground">Compete with your peers and earn rewards!</p>
      </div>

      <div className="bg-surface rounded-3xl border-2 border-border shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b-2 border-border bg-muted/50 text-sm font-bold text-muted-foreground">
          <div className="col-span-2 md:col-span-1 text-center">Rank</div>
          <div className="col-span-7 md:col-span-8">Student</div>
          <div className="col-span-3 text-right">XP</div>
        </div>
        
        <div className="divide-y-2 divide-border">
          {mockLeaderboard.map((user, idx) => (
            <div 
              key={idx} 
              className={`grid grid-cols-12 gap-4 p-4 items-center transition-colors hover:bg-muted/30 ${
                idx === 0 ? "bg-yellow-50/50" : ""
              }`}
            >
              <div className="col-span-2 md:col-span-1 flex justify-center">
                {idx === 0 ? (
                  <Medal className="h-6 w-6 text-yellow-500" />
                ) : idx === 1 ? (
                  <Medal className="h-6 w-6 text-slate-400" />
                ) : idx === 2 ? (
                  <Medal className="h-6 w-6 text-amber-600" />
                ) : (
                  <span className="font-bold text-muted-foreground">{idx + 1}</span>
                )}
              </div>
              <div className="col-span-7 md:col-span-8 flex items-center gap-3">
                <div className="h-10 w-10 bg-muted rounded-full overflow-hidden border-2 border-border">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt={user.name} />
                </div>
                <span className="font-bold">{user.name}</span>
              </div>
              <div className="col-span-3 text-right font-black text-primary">
                {user.xp}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const mockLeaderboard = [
  { name: "Felix Student", xp: 1450 },
  { name: "Anna Schmidt", xp: 1200 },
  { name: "Max Mustermann", xp: 1150 },
  { name: "John Doe", xp: 900 },
  { name: "Sarah Connor", xp: 850 },
  { name: "Tim Apple", xp: 600 },
];
