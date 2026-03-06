import { Screen, LEVELS } from "./types";
import Icon from "@/components/ui/icon";

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

export function NavBar({ screen, setScreen }: { screen: Screen; setScreen: (s: Screen) => void }) {
  const items = [
    { id: "home" as Screen, label: "Главная", emoji: "🏠" },
    { id: "levels" as Screen, label: "Уровни", emoji: "🗺️" },
    { id: "achievements" as Screen, label: "Награды", emoji: "🏆" },
    { id: "character" as Screen, label: "Герой", emoji: "🦸" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-lg px-4 pb-4">
        <div className="game-card flex justify-around p-2 border-2 border-white shadow-2xl">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-200 font-bold text-xs
                ${screen === item.id
                  ? "bg-gradient-to-b from-orange-400 to-orange-500 text-white shadow-md scale-105"
                  : "text-gray-500 hover:bg-orange-50 hover:text-orange-500"
                }`}
            >
              <span className="text-xl">{item.emoji}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
  const totalStars = LEVELS.reduce((acc, l) => acc + l.stars, 0);
  const completedLevels = LEVELS.filter(l => l.stars > 0).length;

  return (
    <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-5xl hero-float inline-block">🚒</span>
          <div>
            <h1 className="text-3xl font-black text-gray-800 leading-none">Миссия</h1>
            <h1 className="text-3xl font-black leading-none" style={{ color: "#FF6B2B" }}>Спасения</h1>
          </div>
          <span className="text-5xl hero-float inline-block" style={{ animationDelay: "0.5s" }}>🏥</span>
        </div>
        <p className="text-gray-500 font-semibold text-sm">Стань настоящим героем-спасателем!</p>
      </div>

      {/* Hero Banner */}
      <div
        className="rounded-3xl p-6 mb-5 relative overflow-hidden shadow-xl"
        style={{ background: "linear-gradient(135deg, #FF6B2B 0%, #FF8C00 50%, #FFD700 100%)" }}
      >
        <div className="absolute top-2 right-8 text-5xl opacity-15 cloud-drift">☁️</div>
        <div className="absolute bottom-1 left-6 text-3xl opacity-15 cloud-drift" style={{ animationDelay: "2s" }}>☁️</div>
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <p className="text-white/80 font-bold text-sm mb-1">Добро пожаловать!</p>
            <h2 className="text-white font-black text-2xl mb-3">Привет, Герой! 👋</h2>
            <div className="flex gap-3">
              <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
                <p className="text-white font-black text-xl leading-none">{completedLevels}</p>
                <p className="text-white/70 text-xs font-semibold">уровней</p>
              </div>
              <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
                <p className="text-white font-black text-xl leading-none">{totalStars}</p>
                <p className="text-white/70 text-xs font-semibold">звёзд ⭐</p>
              </div>
              <div className="bg-white/20 rounded-2xl px-3 py-2 text-center">
                <p className="text-white font-black text-xl leading-none">4</p>
                <p className="text-white/70 text-xs font-semibold">наград 🏆</p>
              </div>
            </div>
          </div>
          <div className="text-7xl hero-float">🦸</div>
        </div>
      </div>

      {/* Continue */}
      <div className="mb-5">
        <h3 className="font-black text-gray-700 text-lg mb-3">⚡ Продолжить</h3>
        <div
          className="game-card p-4 cursor-pointer hover:shadow-xl transition-all duration-200 border-2"
          style={{ borderColor: "#00BFEA" }}
          onClick={() => setScreen("levels")}
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #00BFEA, #0099CC)" }}>
              🏙️
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">Уровень 2</span>
                <Stars count={2} />
              </div>
              <h4 className="font-black text-gray-800">Потерялся в городе</h4>
              <div className="flex items-center gap-2 mt-1">
                <div className="h-2 bg-gray-100 rounded-full flex-1">
                  <div className="h-2 rounded-full" style={{ width: "65%", background: "linear-gradient(90deg, #00BFEA, #0099CC)" }} />
                </div>
                <span className="text-xs text-gray-500 font-semibold">65%</span>
              </div>
            </div>
            <Icon name="ChevronRight" size={24} className="text-blue-400" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="font-black text-gray-700 text-lg mb-3">🎯 Быстрые действия</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { emoji: "🗺️", title: "Все уровни", sub: "6 миссий", color: "from-orange-400 to-red-400", screen: "levels" as Screen },
            { emoji: "🏆", title: "Награды", sub: "4/8 открыто", color: "from-yellow-400 to-amber-400", screen: "achievements" as Screen },
            { emoji: "🦸", title: "Мой герой", sub: "Настроить", color: "from-purple-400 to-pink-400", screen: "character" as Screen },
            { emoji: "📖", title: "Советы дня", sub: "Правила жизни", color: "from-green-400 to-teal-400", screen: "home" as Screen },
          ].map((item, i) => (
            <button
              key={i}
              onClick={() => setScreen(item.screen)}
              className="game-card p-4 text-left hover:shadow-xl transition-all duration-200 active:scale-95"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl mb-2 shadow-md`}>
                {item.emoji}
              </div>
              <p className="font-black text-gray-800 text-sm">{item.title}</p>
              <p className="text-xs text-gray-500 font-semibold">{item.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-5 rounded-3xl p-4 border-2 border-dashed border-green-300 bg-green-50">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-black text-green-800 text-sm">Совет дня</p>
            <p className="text-green-700 text-sm font-semibold mt-0.5">
              Если почувствовал дым — ложись на пол и ползи к выходу. Внизу чистый воздух!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
