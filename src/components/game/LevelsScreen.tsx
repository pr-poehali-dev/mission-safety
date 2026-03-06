import { useState } from "react";
import { LEVELS } from "./types";
import Icon from "@/components/ui/icon";

interface LevelsScreenProps {
  onStartMission: (levelId: number) => void;
}

function Stars({ count, max = 3 }: { count: number; max?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} className={`text-base transition-all duration-200 ${i < count ? "opacity-100" : "opacity-20 grayscale"}`}>
          ⭐
        </span>
      ))}
    </div>
  );
}

export function LevelsScreen({ onStartMission }: LevelsScreenProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🗺️</span>
        <div>
          <h2 className="text-2xl font-black text-gray-800">Уровни</h2>
          <p className="text-sm text-gray-500 font-semibold">Выбери миссию и стань героем!</p>
        </div>
      </div>

      <div className="game-card p-4 mb-5 flex items-center gap-4">
        <div className="flex-1">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-bold text-gray-600">Прогресс</span>
            <span className="text-sm font-black" style={{ color: "#FF6B2B" }}>4/6 уровней</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-3 rounded-full" style={{ width: "66%", background: "linear-gradient(90deg, #FF6B2B, #FFD700)" }} />
          </div>
        </div>
        <div className="star-badge text-base">6 ⭐</div>
      </div>

      <div className="grid gap-4">
        {LEVELS.map((level) => (
          <div
            key={level.id}
            className={`level-card bg-gradient-to-r ${level.bg} border-4 relative overflow-hidden
              ${level.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
            style={{ borderColor: level.color }}
            onClick={() => !level.locked && setSelected(level.id === selected ? null : level.id)}
          >
            {level.locked && (
              <div className="absolute top-3 right-3 bg-gray-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
                <Icon name="Lock" size={16} />
              </div>
            )}
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg flex-shrink-0"
                style={{ background: `linear-gradient(135deg, ${level.color}CC, ${level.border})` }}
              >
                {level.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className={`text-xs font-black px-2 py-0.5 rounded-full ${level.diffColor}`}>
                    {level.difficulty}
                  </span>
                  {!level.locked && <Stars count={level.stars} />}
                </div>
                <h3 className="font-black text-gray-800 text-base leading-tight">{level.title}</h3>
                <p className="text-gray-600 text-xs font-semibold mt-0.5">{level.desc}</p>
                <p className="text-xs font-bold text-gray-500 mt-2">🏅 {level.xp} XP</p>
              </div>
            </div>

            {selected === level.id && !level.locked && (
              <div className="mt-4 pt-4 border-t-2 border-dashed border-white/60 pop-in">
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="bg-white/60 rounded-2xl p-3 text-center">
                    <p className="text-2xl mb-1">⏱️</p>
                    <p className="font-black text-gray-700 text-sm">~5 минут</p>
                    <p className="text-xs text-gray-500">на прохождение</p>
                  </div>
                  <div className="bg-white/60 rounded-2xl p-3 text-center">
                    <p className="text-2xl mb-1">🧩</p>
                    <p className="font-black text-gray-700 text-sm">3 задания</p>
                    <p className="text-xs text-gray-500">с выбором ответов</p>
                  </div>
                </div>
                <button
                  className="btn-game btn-orange w-full flex items-center justify-center gap-2"
                  onClick={() => onStartMission(level.id)}
                >
                  <Icon name="Play" size={18} />
                  Начать миссию!
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}