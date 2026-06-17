"use client";

import { Flame, Zap, Gem, Trophy, PenLine, User, Shield, Globe, SunMoon } from "lucide-react";
import { useTelegram } from "@/components/auth/TelegramProvider";

export default function ProfilePage() {
  const { user } = useTelegram();
  const userName = user?.first_name ? `${user.first_name} ${user.last_name || ''}` : "Ozodbek";
  const userInitials = user?.first_name ? user.first_name.substring(0, 2).toUpperCase() : "OK";
  const username = user?.username ? `@${user.username}` : "@naz1raliyev_05";

  return (
    <div className="p-4 space-y-6 pb-24">
      {/* Header */}
      <header className="pt-2">
        <h1 className="font-black text-2xl text-slate-800">Profil</h1>
      </header>

      {/* Main Profile Card */}
      <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col items-center">
        {/* Avatar */}
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 font-bold text-2xl mb-4">
          {userInitials}
        </div>
        
        {/* Names */}
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg text-slate-800">{username}</span>
          <PenLine size={16} className="text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">{userName}</p>

        {/* Level Progress */}
        <div className="w-full mt-8 mb-6">
          <div className="flex justify-between text-sm font-bold text-slate-500 mb-2 px-1">
            <span>Level 1</span>
            <span className="flex items-center gap-1">0/1000 xp <div className="w-4 h-4 bg-slate-300 text-white rounded-full flex items-center justify-center text-[10px]">i</div></span>
          </div>
          <div className="h-3 w-full bg-white rounded-full overflow-hidden shadow-sm border border-slate-100">
            <div className="h-full bg-blue-500 w-[0%]"></div>
          </div>
        </div>

        {/* Stats Pills */}
        <div className="flex items-center justify-between w-full gap-2">
          <StatPill icon={<Flame size={16} className="text-orange-500" />} text="3-kun" />
          <StatPill icon={<Zap size={16} className="text-blue-500 fill-blue-500" />} text="110" />
          <StatPill icon={<Gem size={16} className="text-purple-500" />} text="0" />
          <StatPill icon={<Trophy size={16} className="text-green-500" />} text="100" />
        </div>
      </div>

      {/* Hisob sozlamalari */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3 px-1">Hisob sozlamalari</h3>
        <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
          <SettingRow icon={<User size={20} className="text-blue-500" />} label="Shaxsiy ma'lumotlar" />
          <div className="h-px bg-slate-200 mx-4"></div>
          <SettingRow icon={<Shield size={20} className="text-blue-500" />} label="Xavfsizlik" />
        </div>
      </div>

      {/* Ilova sozlamalari */}
      <div>
        <h3 className="font-bold text-slate-800 mb-3 px-1">Ilova sozlamalari</h3>
        <div className="bg-slate-50 rounded-3xl border border-slate-100 overflow-hidden">
          <SettingRow icon={<Globe size={20} className="text-blue-500" />} label="Ilova tili" />
          <div className="h-px bg-slate-200 mx-4"></div>
          <SettingRow icon={<SunMoon size={20} className="text-blue-500" />} label="Ilova mavzusi" />
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex-1 flex justify-center items-center gap-1.5 bg-white border border-slate-100 shadow-sm py-2 rounded-full font-bold text-slate-800 text-sm">
      {icon}
      <span>{text}</span>
    </div>
  )
}

function SettingRow({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center justify-between p-4 bg-transparent cursor-pointer hover:bg-slate-100 transition-colors">
      <div className="flex items-center gap-3">
        {icon}
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <div className="text-slate-400">›</div>
    </div>
  )
}
