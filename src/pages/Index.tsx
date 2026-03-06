import { useState } from "react";
import Icon from "@/components/ui/icon";

type Screen = "home" | "levels" | "achievements" | "character";

const HERO_COLORS = ["#FF6B2B", "#00BFEA", "#2ECC71", "#A855F7", "#FF6EB4", "#FFD700"];
const HERO_HATS = ["🎩", "⛑️", "👒", "🪖", "🎓", "👑"];
const HERO_ACCESSORIES = ["🚒", "🏥", "🛡️", "⚡", "🔦", "🧰"];
const HERO_NAMES = ["Алёша", "Маша", "Витя", "Соня", "Дима", "Катя"];

const LEVELS = [
  {
    id: 1,
    title: "Пожарная безопасность",
    emoji: "🔥",
    desc: "Научись спасаться при пожаре",
    color: "#FF6B2B",
    border: "#CC4400",
    bg: "from-orange-100 to-red-100",
    difficulty: "Лёгкий",
    diffColor: "bg-green-100 text-green-700",
    stars: 3,
    locked: false,
    xp: 150,
  },
  {
    id: 2,
    title: "Потерялся в городе",
    emoji: "🏙️",
    desc: "Найди путь домой в большом городе",
    color: "#00BFEA",
    border: "#006699",
    bg: "from-blue-100 to-cyan-100",
    difficulty: "Лёгкий",
    diffColor: "bg-green-100 text-green-700",
    stars: 2,
    locked: false,
    xp: 120,
  },
  {
    id: 3,
    title: "Незнакомцы",
    emoji: "👤",
    desc: "Как вести себя с незнакомыми людьми",
    color: "#A855F7",
    border: "#5B21B6",
    bg: "from-purple-100 to-pink-100",
    difficulty: "Средний",
    diffColor: "bg-yellow-100 text-yellow-700",
    stars: 1,
    locked: false,
    xp: 200,
  },
  {
    id: 4,
    title: "Первая помощь",
    emoji: "🏥",
    desc: "Как помочь пострадавшему",
    color: "#2ECC71",
    border: "#1A8A45",
    bg: "from-green-100 to-teal-100",
    difficulty: "Средний",
    diffColor: "bg-yellow-100 text-yellow-700",
    stars: 0,
    locked: false,
    xp: 250,
  },
  {
    id: 5,
    title: "Природные катастрофы",
    emoji: "⛈️",
    desc: "Действия при стихийных бедствиях",
    color: "#FF4757",
    border: "#CC0011",
    bg: "from-red-100 to-orange-100",
    difficulty: "Сложный",
    diffColor: "bg-red-100 text-red-700",
    stars: 0,
    locked: true,
    xp: 350,
  },
  {
    id: 6,
    title: "Кибербезопасность",
    emoji: "💻",
    desc: "Безопасность в интернете",
    color: "#FFD700",
    border: "#CC8800",
    bg: "from-yellow-100 to-amber-100",
    difficulty: "Сложный",
    diffColor: "bg-red-100 text-red-700",
    stars: 0,
    locked: true,
    xp: 400,
  },
];

const ACHIEVEMENTS = [
  { id: 1, title: "Первые шаги", desc: "Завершил первый уровень", emoji: "👣", unlocked: true, color: "#FF6B2B" },
  { id: 2, title: "Герой огня", desc: "Прошёл уровень с пожаром на 3 звезды", emoji: "🔥", unlocked: true, color: "#FF6B2B" },
  { id: 3, title: "Навигатор", desc: "Помог герою найти дорогу домой", emoji: "🧭", unlocked: true, color: "#00BFEA" },
  { id: 4, title: "Осторожный", desc: "Правильно отреагировал на незнакомца", emoji: "🛡️", unlocked: true, color: "#A855F7" },
  { id: 5, title: "Доктор Знаний", desc: "Изучи первую помощь", emoji: "🏥", unlocked: false, color: "#2ECC71" },
  { id: 6, title: "Коллектор звёзд", desc: "Собери 10 звёзд", emoji: "⭐", unlocked: false, color: "#FFD700" },
  { id: 7, title: "Суперспасатель", desc: "Пройди все уровни", emoji: "🦸", unlocked: false, color: "#FF4757" },
  { id: 8, title: "Кибергерой", desc: "Мастер безопасности в сети", emoji: "💻", unlocked: false, color: "#A855F7" },
];

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

function NavBar({ screen, setScreen }: { screen: Screen; setScreen: (s: Screen) => void }) {
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

function HomeScreen({ setScreen }: { setScreen: (s: Screen) => void }) {
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

function LevelsScreen() {
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
                <button className="btn-game btn-orange w-full flex items-center justify-center gap-2">
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

function AchievementsScreen() {
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
        {ACHIEVEMENTS.filter(a => a.unlocked).map((a, i) => (
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

function CharacterScreen() {
  const [colorIdx, setColorIdx] = useState(0);
  const [hatIdx, setHatIdx] = useState(0);
  const [accIdx, setAccIdx] = useState(0);
  const [nameIdx, setNameIdx] = useState(0);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">🦸</span>
        <div>
          <h2 className="text-2xl font-black text-gray-800">Мой герой</h2>
          <p className="text-sm text-gray-500 font-semibold">Создай своего спасателя!</p>
        </div>
      </div>

      {/* Preview */}
      <div
        className="rounded-3xl p-6 mb-5 text-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-4 opacity-5 text-white text-2xl pointer-events-none">
          {Array.from({ length: 16 }).map((_, i) => <span key={i}>⭐</span>)}
        </div>
        <div className="relative z-10">
          <div
            className="w-28 h-28 rounded-3xl mx-auto mb-3 flex items-center justify-center text-5xl shadow-2xl relative"
            style={{ background: `linear-gradient(135deg, ${HERO_COLORS[colorIdx]}AA, ${HERO_COLORS[colorIdx]})` }}
          >
            <span>🦸</span>
            <span className="absolute -top-3 -right-2 text-3xl">{HERO_HATS[hatIdx]}</span>
          </div>
          <h3 className="text-white font-black text-2xl mb-1">{HERO_NAMES[nameIdx]}</h3>
          <p className="text-white/70 font-semibold text-sm">Спасатель-герой {HERO_ACCESSORIES[accIdx]}</p>
          <div className="flex justify-center gap-2 mt-3">
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">Уровень 3</span>
            <span className="bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">470 XP</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {/* Name */}
        <div className="game-card p-4">
          <h4 className="font-black text-gray-700 mb-3 flex items-center gap-2">✏️ Имя героя</h4>
          <div className="flex gap-2 flex-wrap">
            {HERO_NAMES.map((name, i) => (
              <button
                key={i}
                onClick={() => setNameIdx(i)}
                className={`px-4 py-2 rounded-2xl font-bold text-sm transition-all duration-150
                  ${nameIdx === i ? "text-white shadow-md scale-105" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                style={nameIdx === i ? { background: "linear-gradient(135deg, #FF6B2B, #FF8C00)" } : {}}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="game-card p-4">
          <h4 className="font-black text-gray-700 mb-3">🎨 Цвет костюма</h4>
          <div className="flex gap-3">
            {HERO_COLORS.map((color, i) => (
              <button
                key={i}
                onClick={() => setColorIdx(i)}
                className="w-10 h-10 rounded-full shadow-md transition-all duration-150 hover:scale-110 flex items-center justify-center"
                style={{ background: color, outline: colorIdx === i ? `3px solid ${color}` : "none", outlineOffset: "3px" }}
              >
                {colorIdx === i && <span className="text-white font-black">✓</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Hat */}
        <div className="game-card p-4">
          <h4 className="font-black text-gray-700 mb-3">🎩 Головной убор</h4>
          <div className="flex gap-2">
            {HERO_HATS.map((hat, i) => (
              <button
                key={i}
                onClick={() => setHatIdx(i)}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all duration-150
                  ${hatIdx === i ? "scale-110 shadow-md" : "bg-gray-100 hover:bg-gray-200"}`}
                style={hatIdx === i ? { background: "linear-gradient(135deg, #A855F7, #7C3AED)" } : {}}
              >
                {hat}
              </button>
            ))}
          </div>
        </div>

        {/* Tool */}
        <div className="game-card p-4">
          <h4 className="font-black text-gray-700 mb-3">⚡ Инструмент спасателя</h4>
          <div className="flex gap-2">
            {HERO_ACCESSORIES.map((acc, i) => (
              <button
                key={i}
                onClick={() => setAccIdx(i)}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all duration-150
                  ${accIdx === i ? "scale-110 shadow-md" : "bg-gray-100 hover:bg-gray-200"}`}
                style={accIdx === i ? { background: "linear-gradient(135deg, #2ECC71, #27AE60)" } : {}}
              >
                {acc}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-5">
        <button
          onClick={handleSave}
          className={`btn-game w-full flex items-center justify-center gap-2 text-base ${saved ? "btn-green" : "btn-orange"}`}
        >
          {saved ? (
            <><span>✅</span> Сохранено!</>
          ) : (
            <><Icon name="Save" size={20} /> Сохранить героя</>
          )}
        </button>
      </div>
    </div>
  );
}

export default function Index() {
  const [screen, setScreen] = useState<Screen>("home");

  return (
    <div className="font-nunito">
      {screen === "home" && <HomeScreen setScreen={setScreen} />}
      {screen === "levels" && <LevelsScreen />}
      {screen === "achievements" && <AchievementsScreen />}
      {screen === "character" && <CharacterScreen />}
      <NavBar screen={screen} setScreen={setScreen} />
    </div>
  );
}
