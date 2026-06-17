import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { BookOpen, Trophy, Users, Zap } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 lg:px-14 py-4 flex items-center justify-between border-b-2 border-border bg-surface">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold tracking-tight text-primary">StudyArena</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="hidden sm:inline-flex">Log in</Button>
          </Link>
          <Link href="/login">
            <Button variant="default">Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 gap-8">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-tight">
            Level up your learning journey.
          </h1>
          <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
            The gamified learning platform for Telegram communities. Earn XP, maintain streaks, and master your subjects with AI assistance.
          </p>
        </div>

        <Link href="/login">
          <Button size="lg" className="text-lg px-12 h-16 rounded-2xl w-full sm:w-auto">
            Start Learning Now
          </Button>
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16 max-w-5xl w-full">
          <FeatureCard 
            icon={<Trophy className="h-10 w-10 text-primary" />}
            title="Gamified Experience"
            description="Earn XP, unlock badges, and climb the leaderboard as you complete your assignments."
          />
          <FeatureCard 
            icon={<Zap className="h-10 w-10 text-secondary" />}
            title="Daily Streaks"
            description="Build healthy learning habits by keeping your daily streak alive."
          />
          <FeatureCard 
            icon={<Users className="h-10 w-10 text-purple-500" />}
            title="Community Driven"
            description="Seamlessly integrated with Telegram for easy access and community engagement."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-surface border-2 border-border rounded-3xl shadow-sm">
      <div className="mb-4 p-4 bg-muted rounded-full">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}
