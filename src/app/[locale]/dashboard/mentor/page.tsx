import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, CheckCircle, Plus } from "lucide-react";

export default function MentorDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Mentor Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and review submissions.</p>
        </div>
        <Button className="gap-2">
          <Plus size={20} /> New Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="h-8 w-8 text-secondary" />} title="Total Students" value="128" />
        <StatCard icon={<BookOpen className="h-8 w-8 text-primary" />} title="Active Courses" value="4" />
        <StatCard icon={<CheckCircle className="h-8 w-8 text-orange-500" />} title="Pending Reviews" value="12" />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 px-2">Recent Submissions to Review</h2>
        <div className="grid gap-4">
          {mockSubmissions.map((sub, idx) => (
            <Card key={idx} className="gamified-card hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-bold">{sub.student}</h4>
                  <p className="text-sm text-muted-foreground">{sub.assignment}</p>
                </div>
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <span className="text-sm font-medium bg-orange-100 text-orange-700 px-3 py-1 rounded-full">
                    Needs Grading
                  </span>
                  <Button variant="secondary" className="ml-auto">Review</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <Card className="gamified-card border-b-4">
      <CardContent className="p-6 flex items-center gap-4">
        <div className="p-3 bg-muted rounded-2xl">
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-black">{value}</p>
        </div>
      </CardContent>
    </Card>
  )
}

const mockSubmissions = [
  { student: "Anna Schmidt", assignment: "German Cases Practice" },
  { student: "Max Mustermann", assignment: "React Hooks Quiz" },
  { student: "John Doe", assignment: "IELTS Reading Test" },
];
