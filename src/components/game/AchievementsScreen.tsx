import { ACHIEVEMENTS } from "./types";
import Icon from "@/components/ui/icon";

export function AchievementsScreen() {
  const unlocked = ACHIEVEMENTS.filter(a => a.unlocked).length;

  return (
    <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🏆</span>
        <div>
          <h2 className="text-2xl font-black text-gray-800">Достижения</h2>
          <p className="text-sm text-gray-500 font-semibold">Открыто {unlocked} из {ACHIEVEMENTS.length}</p>
        </div>
      </div>

      <div className="rounded-3xl p-5 mb-5 relative overflow-hidden shadow-xl"
        style={{ background: "linear-gradient(135deg, #FFD700, #FFA500)" }}>
        <div className="absolute -right-4 -top-4 text-8xl opacity-10">🏆</div>
        <div className="relative z-10">
          <p className="text-amber-900 font-bold text-sm mb-2">Твои награды</p>
          <div className="flex gap-6 items-end">
            <div>
              <p className="text-4xl font-black text-amber-900">{unlocked}</p>
              <p className="text-amber-700 font-semibold text-xs">открыто</p>
            </div>
            <div>
              <p className="text-4xl font-black text-amber-900">{ACHIEVEMENTS.length - unlocked}</p>
              <p className="text-amber-700 font-semibold text-xs">осталось</p>
            </div>
            <div className="flex-1">
              <div className="h-3 bg-amber-900/20 rounded-full overflow-hidden">
                <div
                  className="h-3 bg-amber-900/50 rounded-full"
                  style={{ width: `${(unlocked / ACHIEVEMENTS.length) * 100}%` }}
                />
              </div>
              <p className="text-amber-700 text-xs font-bold mt-1 text-right">{Math.round((unlocked / ACHIEVEMENTS.length) * 100)}%</p>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-black text-gray-700 mb-3">✅ Разблокировано</h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {ACHIEVEMENTS.filter(a => a.unlocked).map((a) => (
          <div
            key={a.id}
            className="game-card p-4 text-center border-2"
            style={{ borderColor: a.color + "55" }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 shadow-md"
              style={{ background: `${a.color}22` }}
            >
              {a.emoji}
            </div>
            <p className="font-black text-gray-800 text-sm leading-tight">{a.title}</p>
            <p className="text-xs text-gray-500 font-semibold mt-1">{a.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="font-black text-gray-700 mb-3">🔒 Ещё впереди</h3>
      <div className="grid grid-cols-2 gap-3">
        {ACHIEVEMENTS.filter(a => !a.unlocked).map((a) => (
          <div key={a.id} className="game-card p-4 text-center opacity-50">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2 bg-gray-100">
              <Icon name="Lock" size={24} className="text-gray-400" />
            </div>
            <p className="font-black text-gray-600 text-sm leading-tight">{a.title}</p>
            <p className="text-xs text-gray-400 font-semibold mt-1">{a.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
