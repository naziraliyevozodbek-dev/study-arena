import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Flame, Star, Target, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      {/* Top Stats Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-surface p-6 rounded-3xl border-2 border-border shadow-sm">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 bg-muted rounded-full border-4 border-primary/20 overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Felix Student</h2>
            <p className="text-muted-foreground font-medium">Level 5 Scholar</p>
          </div>
        </div>
        
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Flame className="h-8 w-8 text-orange-500 fill-orange-500" />
            <span className="text-2xl font-bold text-orange-500">12</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-8 w-8 text-yellow-400 fill-yellow-400" />
            <span className="text-2xl font-bold text-yellow-500">1450 XP</span>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <Card className="gamified-card border-b-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="text-primary h-6 w-6" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between text-sm font-bold mb-2">
            <span>Level 5</span>
            <span className="text-muted-foreground">1450 / 2000 XP</span>
          </div>
          <Progress value={1450} max={2000} className="h-6" />
        </CardContent>
      </Card>

      {/* Daily Tasks / Assignments */}
      <div>
        <h3 className="text-2xl font-bold mb-4 px-2">Today's Quests</h3>
        <div className="grid gap-4">
          {mockAssignments.map((assignment, idx) => (
            <Card key={idx} className="gamified-card hover:bg-muted/50 transition-colors">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`mt-1 p-2 rounded-full ${assignment.completed ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'}`}>
                    {assignment.completed ? <CheckCircle className="h-6 w-6" /> : <BookOpen className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">{assignment.title}</h4>
                    <p className="text-sm text-muted-foreground">{assignment.course}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-bold text-sm">
                    <Star className="h-4 w-4" /> +{assignment.xp} XP
                  </div>
                  <Button 
                    variant={assignment.completed ? "outline" : "default"} 
                    className="ml-auto"
                    disabled={assignment.completed}
                  >
                    {assignment.completed ? "Done" : "Start"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Just a quick icon mock
function BookOpen({ className }: { className?: string }) {
  return <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
}

const mockAssignments = [
  { title: "German Cases Practice", course: "German A1", xp: 50, completed: false },
  { title: "React Hooks Quiz", course: "Frontend Dev", xp: 100, completed: false },
  { title: "IELTS Reading Test", course: "English Prep", xp: 150, completed: true },
];
