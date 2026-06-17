"use client";

import { Zap, CheckCircle2, Book, Swords, Users, Gem, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function QuestsPage() {
  const [activeTab, setActiveTab] = useState('Kunlik');

  return (
    <div className="p-4 space-y-6 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <h1 className="font-black text-2xl text-slate-800">Kvestlar</h1>
        <div className="bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1">
          <Zap size={16} className="text-blue-500 fill-blue-500" />
          <span className="font-bold text-sm">110</span>
        </div>
      </header>

      {/* Segmented Control */}
      <div className="bg-slate-50 border border-slate-100 rounded-full p-1 flex">
        {['Kunlik', 'Taklif', 'Yutuqlar'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-sm font-semibold rounded-full transition-all ${
              activeTab === tab 
                ? 'bg-white text-slate-900 shadow-sm' 
                : 'text-slate-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Quests List */}
      <div>
        <h3 className="font-bold text-lg mb-4 text-slate-800">Kunlik kvestlar</h3>
        
        <div className="space-y-3">
          {/* Active green quest */}
          <div className="bg-green-50 rounded-2xl p-4 flex items-center justify-between border border-green-100 cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 rounded-xl">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-800">7 kunlik challenge</h4>
                <p className="text-xs text-slate-500 font-medium">Har kuni kirib bonus energiya oling</p>
              </div>
            </div>
            <div className="w-6 h-6 rounded-full border-2 border-green-500 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>

          {/* Standard quests */}
          <QuestItem 
            icon={<Book className="text-blue-600" size={24} />}
            title="Yangi so'zlar"
            reward="+20"
            rewardIcon={<Zap size={14} className="text-blue-500 fill-blue-500" />}
          />

          <QuestItem 
            icon={<Swords className="text-blue-600" size={24} />}
            title="Yangi bellashuv"
            reward="+10"
            rewardIcon={<Zap size={14} className="text-blue-500 fill-blue-500" />}
          />

          <QuestItem 
            icon={<Users className="text-blue-600" size={24} />}
            title="Do'stlarni taklif qilish"
            reward="+10"
            rewardIcon={<Gem size={14} className="text-purple-500" />}
          />
        </div>
      </div>
    </div>
  );
}

function QuestItem({ icon, title, reward, rewardIcon }: { icon: React.ReactNode, title: string, reward: string, rewardIcon: React.ReactNode }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors">
      <div className="flex items-center gap-4">
        <div className="p-1">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-slate-800">{title}</h4>
          <div className="flex items-center gap-1 text-sm font-bold text-slate-700 mt-1">
            {reward} {rewardIcon}
          </div>
        </div>
      </div>
      <ChevronRight className="text-slate-400" size={20} />
    </div>
  )
}
