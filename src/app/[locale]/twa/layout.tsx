"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutGrid, CheckSquare, User } from "lucide-react";
import { ReactNode } from "react";

export default function TWALayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-white text-slate-900 pb-24 font-sans selection:bg-blue-100">
      {/* Main Content Area */}
      <main className="w-full max-w-md mx-auto relative">
        {children}
      </main>

      {/* Floating Bottom Navigation Bar */}
      <div className="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4 pointer-events-none">
        <nav className="bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full px-2 py-2 flex items-center justify-between gap-1 w-full max-w-sm pointer-events-auto">
          <NavItem href="/twa" icon={<BookOpen size={24} className="mb-1" />} label="Ish maydoni" active={pathname === '/twa'} />
          <NavItem href="/twa/catalog" icon={<LayoutGrid size={24} className="mb-1" />} label="Katalog" active={pathname.includes('/twa/catalog')} />
          <NavItem href="/twa/quests" icon={<CheckSquare size={24} className="mb-1" />} label="Kvestlar" active={pathname.includes('/twa/quests')} />
          <NavItem href="/twa/profile" icon={<User size={24} className="mb-1" />} label="Profil" active={pathname.includes('/twa/profile')} />
        </nav>
      </div>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string; icon: ReactNode; label: string; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center w-20 py-1 rounded-3xl transition-colors ${active ? 'text-blue-600 bg-blue-50/50' : 'text-slate-400 hover:text-slate-600'}`}
    >
      {icon}
      <span className="text-[10px] font-medium tracking-tight">{label}</span>
    </Link>
  );
}
