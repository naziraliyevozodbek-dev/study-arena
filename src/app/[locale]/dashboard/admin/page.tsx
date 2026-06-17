import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, Settings, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and settings.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard icon={<Users className="h-8 w-8 text-primary" />} title="Total Users" value="1,248" />
        <StatCard icon={<Activity className="h-8 w-8 text-secondary" />} title="Active Now" value="142" />
        <StatCard icon={<TrendingUp className="h-8 w-8 text-orange-500" />} title="Total XP Earned" value="2.4M" />
        <StatCard icon={<Settings className="h-8 w-8 text-slate-500" />} title="System Status" value="Healthy" />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4 px-2">Recent Activity</h2>
        <Card className="gamified-card">
          <CardContent className="p-6">
            <p className="text-muted-foreground text-center py-8">Activity log will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode, title: string, value: string }) {
  return (
    <Card className="gamified-card border-b-4">
      <CardContent className="p-6 flex flex-col items-center text-center gap-2">
        <div className="p-3 bg-muted rounded-2xl mb-2">
          {icon}
        </div>
        <p className="text-sm text-muted-foreground font-medium">{title}</p>
        <p className="text-2xl font-black">{value}</p>
      </CardContent>
    </Card>
  )
}
