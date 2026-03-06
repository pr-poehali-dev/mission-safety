import { useState } from "react";
import { HERO_COLORS, HERO_HATS, HERO_ACCESSORIES, HERO_NAMES } from "./types";
import Icon from "@/components/ui/icon";

export function CharacterScreen() {
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
          <h4 className="font-black text-gray-700 mb-3">✏️ Имя героя</h4>
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
