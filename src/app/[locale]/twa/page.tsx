import { Bell, Flame, Zap, Gem, Trophy, Users, Copy, Calendar } from "lucide-react";
import Link from "next/link";

export default function TWAHomePage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-1.5 rounded-lg">
            <div className="w-4 h-4 bg-blue-500 rounded-sm rotate-45"></div>
          </div>
          <span className="font-black text-xl tracking-tight text-slate-800">
            BEK <span className="font-medium text-slate-500 text-sm block -mt-1.5">Academy</span>
          </span>
        </div>
        <button className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-700">
          <Bell size={20} />
        </button>
      </header>

      {/* Stats Pills (Horizontal scrollable) */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
        <StatPill icon={<Flame size={16} className="text-orange-500" />} text="3-kun" />
        <StatPill icon={<Zap size={16} className="text-blue-500 fill-blue-500" />} text="110" />
        <StatPill icon={<Gem size={16} className="text-purple-500" />} text="0" />
        <StatPill icon={<Trophy size={16} className="text-green-500" />} text="100" />
      </div>

      {/* Monthly Challenge Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-3xl p-5 text-white shadow-sm relative overflow-hidden h-36 flex flex-col justify-center">
        <div className="z-10">
          <h2 className="text-xl font-bold mb-3">Monthly challenge</h2>
          <div className="bg-white text-slate-800 px-3 py-1.5 rounded-full inline-flex items-center gap-2 text-sm font-medium">
            <Calendar size={16} className="text-blue-500" />
            Until June 30
          </div>
        </div>
        <div className="absolute right-0 bottom-0 top-0 w-32 bg-blue-300/30 rounded-l-full">
          {/* Placeholder for the Panda 3D Image */}
          <div className="absolute right-2 bottom-2 text-6xl">🐼</div>
        </div>
      </div>

      {/* Kunlik Vazifalar */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-800">Kunlik vazifalar</h3>
        <div className="grid grid-cols-2 gap-4">
          <TaskCard 
            title="Yangi so'zlar"
            emoji="📘"
            reward="+20"
          />
          <TaskCard 
            title="Yangi bellashuv"
            emoji="🎮"
            reward="+20"
          />
        </div>
      </div>

      {/* Taklif kvestlari */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-800 flex items-center gap-2">
          Taklif kvestlari <div className="w-5 h-5 bg-slate-200 text-slate-500 rounded-full flex items-center justify-center text-xs">i</div>
        </h3>
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center flex-shrink-0 text-blue-600">
              <Users size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">Do'stlarni taklif qiling</h4>
              <p className="text-sm text-slate-500 mt-1 leading-snug">Darajasi oshgan har bir do'st uchun qo'shimcha energiya oling.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-2xl transition-colors">
              Ulashish
            </button>
            <button className="w-14 h-14 bg-white border border-slate-200 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <Copy size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatPill({ icon, text }: { icon: React.ReactNode, text: string }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm px-4 py-2 rounded-full whitespace-nowrap font-bold text-slate-800">
      {icon}
      <span>{text}</span>
    </div>
  )
}

function TaskCard({ title, emoji, reward }: { title: string, emoji: string, reward: string }) {
  return (
    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col h-40 relative overflow-hidden">
      <h4 className="font-bold text-slate-800">{title}</h4>
      <div className="mt-auto z-10">
        <div className="bg-white px-3 py-1.5 rounded-full inline-flex items-center gap-1 text-sm font-bold shadow-sm">
          {reward} <Zap size={14} className="text-blue-500 fill-blue-500" />
        </div>
      </div>
      <div className="absolute right-0 bottom-0 text-6xl opacity-90 translate-x-2 translate-y-2">
        {emoji}
      </div>
    </div>
  )
}
