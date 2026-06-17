import Link from "next/link";
import { BookOpen, Home, Trophy, User, LogOut, Bot, Gamepad } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r-2 border-border bg-surface flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight text-primary">StudyArena</span>
          </Link>
          <nav className="flex flex-col gap-2">
            <NavItem href="/dashboard/student" icon={<Home size={20} />} label="Home" />
            <NavItem href="/dashboard/student/leaderboard" icon={<Trophy size={20} />} label="Leaderboard" />
            <NavItem href="/dashboard/student/practice" icon={<Gamepad size={20} />} label="Practice Zone" />
            <NavItem href="/dashboard/student/tutor" icon={<Bot size={20} />} label="AI Tutor" />
            <NavItem href="/dashboard/student/profile" icon={<User size={20} />} label="Profile" />
          </nav>
        </div>
        <div className="p-6 border-t-2 border-border">
          <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground font-medium rounded-xl hover:bg-muted transition-colors">
            <LogOut size={20} />
            <span>Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Navigation Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 w-full bg-surface border-t-2 border-border flex justify-around p-2 pb-safe z-50">
        <MobileNavItem href="/dashboard/student" icon={<Home size={22} />} label="Home" />
        <MobileNavItem href="/dashboard/student/practice" icon={<Gamepad size={22} />} label="Practice" />
        <MobileNavItem href="/dashboard/student/leaderboard" icon={<Trophy size={22} />} label="Rank" />
        <MobileNavItem href="/dashboard/student/tutor" icon={<Bot size={22} />} label="Tutor" />
        <MobileNavItem href="/dashboard/student/profile" icon={<User size={22} />} label="Profile" />
      </nav>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-3 px-4 py-3 text-foreground font-bold rounded-2xl hover:bg-muted border-2 border-transparent hover:border-border transition-all">
      <span className="text-muted-foreground">{icon}</span>
      <span>{label}</span>
    </Link>
  )
}

function MobileNavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors">
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </Link>
  )
}
