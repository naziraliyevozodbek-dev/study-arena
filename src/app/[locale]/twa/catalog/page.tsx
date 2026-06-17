import { Zap } from "lucide-react";

export default function CatalogPage() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <h1 className="font-black text-2xl text-slate-800">Katalog</h1>
        <div className="bg-slate-100 px-3 py-1.5 rounded-full flex items-center gap-1">
          <Zap size={16} className="text-blue-500 fill-blue-500" />
          <span className="font-bold text-sm">110</span>
        </div>
      </header>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 gap-4 h-[400px]">
        
        {/* Large Item (Left) */}
        <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100 flex flex-col relative overflow-hidden row-span-2">
          <h3 className="font-bold text-slate-800 text-lg z-10">Bellashuv</h3>
          <div className="absolute -bottom-4 -right-4 text-9xl">🏆</div>
        </div>

        {/* Small Items (Right) */}
        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col justify-between items-center relative overflow-hidden h-full">
          <div className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md self-start">
            Tez kunda
          </div>
          <span className="font-medium text-slate-500 mt-auto pb-4">Lug'at</span>
        </div>

        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col justify-between items-center relative overflow-hidden h-full">
          <div className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md self-start">
            Tez kunda
          </div>
          <span className="font-medium text-slate-500 mt-auto pb-4">Kutubxona</span>
        </div>
      </div>

      {/* Bottom Row Items */}
      <div className="grid grid-cols-2 gap-4 h-[180px]">
        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col justify-between items-center relative overflow-hidden">
          <div className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md self-start">
            Tez kunda
          </div>
          <span className="font-medium text-slate-500 mt-auto pb-4">Til qo'llanmasi</span>
        </div>

        <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex flex-col justify-between items-center relative overflow-hidden">
          <div className="bg-orange-100 text-orange-600 text-xs font-bold px-2 py-1 rounded-md self-start">
            Tez kunda
          </div>
          <span className="font-medium text-slate-500 mt-auto pb-4">Testlar</span>
        </div>
      </div>
    </div>
  );
}
