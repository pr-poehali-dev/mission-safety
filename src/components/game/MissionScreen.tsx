import { useState } from "react";
import { LEVELS } from "./types";
import Icon from "@/components/ui/icon";

const QUESTIONS: Record<number, { question: string; answers: string[]; correct: number; hint: string }[]> = {
  1: [
    {
      question: "🔥 В комнате появился дым. Что нужно сделать в первую очередь?",
      answers: ["Открыть окно и проветрить", "Лечь на пол и ползти к выходу", "Спрятаться под кровать", "Позвонить другу"],
      correct: 1,
      hint: "Дым поднимается вверх — внизу всегда чище и больше кислорода!",
    },
    {
      question: "🚪 Ты хочешь выйти через дверь. Как проверить, можно ли её открывать?",
      answers: ["Просто открыть дверь", "Потрогать дверь рукой — если горячая, не открывать", "Постучать по двери", "Позвать на помощь через дверь"],
      correct: 1,
      hint: "Горячая дверь означает — за ней огонь! Ищи другой выход.",
    },
    {
      question: "📞 Ты оказался в безопасности на улице. Какой номер нужно набрать?",
      answers: ["112", "911", "123", "999"],
      correct: 0,
      hint: "112 — единый номер экстренных служб в России, работает всегда!",
    },
  ],
  2: [
    {
      question: "🏙️ Ты потерялся в незнакомом районе. Что нужно сделать прежде всего?",
      answers: ["Бежать куда глаза глядят", "Остановиться и успокоиться", "Плакать и кричать", "Идти за незнакомым человеком"],
      correct: 1,
      hint: "Паника только мешает! Остановись, успокойся и подумай.",
    },
    {
      question: "👮 К кому лучше всего обратиться за помощью на улице?",
      answers: ["К любому незнакомцу", "К полицейскому или охраннику в магазине", "К человеку в машине", "Ни к кому — сам разберусь"],
      correct: 1,
      hint: "Полицейский или охранник — люди в форме, им можно доверять!",
    },
    {
      question: "📍 Что важно знать наизусть на случай, если потеряешься?",
      answers: ["Свой рост и вес", "Домашний адрес и номер телефона родителей", "Название любимого мультика", "Номер школы"],
      correct: 1,
      hint: "Адрес и телефон родителей — это твой главный «компас» домой!",
    },
  ],
  3: [
    {
      question: "👤 Незнакомый взрослый предлагает тебе конфеты и зовёт в машину. Что делать?",
      answers: ["Взять конфеты и сесть в машину", "Вежливо отказать и уйти к людям", "Спросить имя незнакомца", "Подождать немного"],
      correct: 1,
      hint: "Никогда не садись в машину к незнакомцам, даже если они очень добрые!",
    },
    {
      question: "📱 Незнакомец в интернете просит прислать твою фотографию. Что ты сделаешь?",
      answers: ["Пришлю фото", "Откажусь и расскажу родителям", "Спрошу зачем", "Пришлю фото друга"],
      correct: 1,
      hint: "Никогда не отправляй фото незнакомцам! Сразу расскажи взрослым.",
    },
    {
      question: "🏃 Если незнакомец схватил тебя за руку — что нужно делать?",
      answers: ["Молчать и слушаться", "Громко кричать «Это не мой папа!» и звать людей", "Заплакать тихо", "Попросить отпустить"],
      correct: 1,
      hint: "Громкий крик привлечёт внимание прохожих — не молчи!",
    },
  ],
  4: [
    {
      question: "🤕 Твой друг упал и сильно порезал руку. Что делать первым делом?",
      answers: ["Убежать", "Прижать рану чистой тканью и вызвать помощь", "Намочить рану водой из лужи", "Подуть на рану"],
      correct: 1,
      hint: "Прижми рану — это остановит кровотечение, пока не приедет помощь!",
    },
    {
      question: "🔥 Человек получил ожог. Что нужно сделать сразу?",
      answers: ["Намазать маслом", "Охладить прохладной водой 10-15 минут", "Перевязать тугой повязкой", "Ничего не делать"],
      correct: 1,
      hint: "Прохладная вода снимает боль и уменьшает повреждение тканей!",
    },
    {
      question: "😮 Человек потерял сознание. Что делать?",
      answers: ["Дать ему воду", "Вызвать скорую помощь — 112", "Потрясти его за плечи сильно", "Оставить одного"],
      correct: 1,
      hint: "При потере сознания всегда вызывай скорую — 112!",
    },
  ],
  5: [
    {
      question: "⛈️ Началась сильная гроза. Где безопаснее всего укрыться?",
      answers: ["Под высоким деревом", "В здании или укрытом месте подальше от деревьев", "На открытом поле", "Под металлическим навесом"],
      correct: 1,
      hint: "Молния бьёт в высокие объекты — деревья опасны!",
    },
    {
      question: "🌊 Объявили эвакуацию из-за наводнения. Что взять с собой?",
      answers: ["Все игрушки", "Документы, воду, аптечку и тёплые вещи", "Телевизор", "Ничего — всё купим"],
      correct: 1,
      hint: "Документы и аптечка — самое важное при эвакуации!",
    },
    {
      question: "🏠 Во время землетрясения ты дома. Куда прятаться?",
      answers: ["К окну", "Под стол или в дверной проём", "На балкон", "На улицу через окно"],
      correct: 1,
      hint: "Стол или дверной проём защитят от падающих предметов!",
    },
  ],
  6: [
    {
      question: "💻 Тебе пришло письмо: «Ты выиграл iPhone! Введи пароль». Что делать?",
      answers: ["Ввести пароль", "Удалить письмо и рассказать родителям", "Позвонить по номеру из письма", "Переслать друзьям"],
      correct: 1,
      hint: "Это мошенники! Никогда не вводи пароли по ссылкам из писем.",
    },
    {
      question: "🔐 Какой пароль самый надёжный?",
      answers: ["123456", "Своё имя", "Случайные буквы, цифры и символы", "Дата рождения"],
      correct: 2,
      hint: "Сложный пароль — лучшая защита твоих данных!",
    },
    {
      question: "📸 Одноклассник просит не рассказывать родителям об их переписке. Что делать?",
      answers: ["Молчать — он же друг", "Рассказать родителям или учителю", "Удалить переписку", "Игнорировать"],
      correct: 1,
      hint: "Секреты от родителей в интернете — сигнал опасности!",
    },
  ],
};

interface MissionScreenProps {
  levelId: number;
  onBack: () => void;
}

export function MissionScreen({ levelId, onBack }: MissionScreenProps) {
  const [step, setStep] = useState<"play" | "result">("play");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [showHint, setShowHint] = useState(false);

  const level = LEVELS.find(l => l.id === levelId)!;
  const questions = QUESTIONS[levelId] ?? QUESTIONS[1];
  const q = questions[current];
  const correctCount = answers.filter(Boolean).length;
  const stars = correctCount === 3 ? 3 : correctCount === 2 ? 2 : correctCount === 1 ? 1 : 0;

  const handleAnswer = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    setShowHint(true);
  };

  const handleNext = () => {
    const isCorrect = selected === q.correct;
    const newAnswers = [...answers, isCorrect];
    setAnswers(newAnswers);
    if (current + 1 >= questions.length) {
      setStep("result");
    } else {
      setCurrent(current + 1);
      setSelected(null);
      setShowHint(false);
    }
  };

  if (step === "result") {
    return (
      <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto flex flex-col items-center justify-center">
        <div
          className="w-full rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${level.color}CC, ${level.border})` }}
        >
          <div className="absolute inset-0 opacity-10 text-6xl flex flex-wrap justify-center items-center gap-4 pointer-events-none">
            {Array.from({ length: 12 }).map((_, i) => <span key={i}>⭐</span>)}
          </div>
          <div className="relative z-10">
            <div className="text-7xl mb-4">
              {stars === 3 ? "🏆" : stars === 2 ? "🥈" : stars === 1 ? "🥉" : "😢"}
            </div>
            <h2 className="text-white font-black text-3xl mb-2">
              {stars === 3 ? "Отлично!" : stars === 2 ? "Хорошо!" : stars === 1 ? "Неплохо!" : "Попробуй ещё!"}
            </h2>
            <p className="text-white/80 font-semibold mb-4">
              Правильных ответов: {correctCount} из {questions.length}
            </p>
            <div className="flex justify-center gap-2 mb-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <span key={i} className={`text-4xl transition-all ${i < stars ? "opacity-100" : "opacity-25 grayscale"}`}>⭐</span>
              ))}
            </div>
            <div className="bg-white/20 rounded-2xl px-4 py-2 inline-block mb-6">
              <span className="text-white font-black text-lg">+{stars * Math.floor(level.xp / 3)} XP</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => { setCurrent(0); setAnswers([]); setSelected(null); setShowHint(false); setStep("play"); }}
                className="btn-game flex-1 flex items-center justify-center gap-2"
                style={{ background: "rgba(255,255,255,0.25)", boxShadow: "0 4px 0 rgba(0,0,0,0.2)" }}
              >
                <Icon name="RotateCcw" size={18} />
                Заново
              </button>
              <button
                onClick={onBack}
                className="btn-game btn-orange flex-1 flex items-center justify-center gap-2"
              >
                <Icon name="Map" size={18} />
                К уровням
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-28 px-4 pt-8 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-2xl bg-white shadow-md flex items-center justify-center hover:shadow-lg transition-all"
        >
          <Icon name="ArrowLeft" size={20} className="text-gray-600" />
        </button>
        <div className="flex-1">
          <h2 className="font-black text-gray-800 text-lg leading-tight">{level.title}</h2>
          <p className="text-xs text-gray-500 font-semibold">Вопрос {current + 1} из {questions.length}</p>
        </div>
        <div className="flex gap-1">
          {questions.map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: i < answers.length
                  ? (answers[i] ? "#2ECC71" : "#FF4757")
                  : i === current
                    ? level.color
                    : "#E5E7EB"
              }}
            />
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
        <div
          className="h-2 rounded-full transition-all duration-500"
          style={{ width: `${((current) / questions.length) * 100}%`, background: `linear-gradient(90deg, ${level.color}, ${level.border})` }}
        />
      </div>

      {/* Question card */}
      <div
        className="rounded-3xl p-6 mb-5 shadow-xl relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${level.color}22, ${level.color}11)`, borderLeft: `5px solid ${level.color}` }}
      >
        <div className="absolute -right-4 -top-4 text-6xl opacity-10">{level.emoji}</div>
        <p className="font-black text-gray-800 text-lg leading-snug relative z-10">{q.question}</p>
      </div>

      {/* Answers */}
      <div className="grid gap-3 mb-4">
        {q.answers.map((answer, idx) => {
          let style = "bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:shadow-md";
          if (selected !== null) {
            if (idx === q.correct) style = "border-2 border-green-400 bg-green-50 text-green-800";
            else if (idx === selected && selected !== q.correct) style = "border-2 border-red-400 bg-red-50 text-red-700";
            else style = "bg-white border-2 border-gray-100 text-gray-400";
          }

          return (
            <button
              key={idx}
              onClick={() => handleAnswer(idx)}
              className={`w-full p-4 rounded-2xl text-left font-bold text-sm transition-all duration-200 flex items-center gap-3 shadow-sm
                ${selected === null ? "active:scale-98 cursor-pointer" : "cursor-default"} ${style}`}
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0"
                style={{ background: selected !== null && idx === q.correct ? "#2ECC71" : selected !== null && idx === selected ? "#FF4757" : level.color + "22", color: selected !== null && idx === q.correct ? "white" : selected !== null && idx === selected ? "white" : level.color }}
              >
                {selected !== null && idx === q.correct ? "✓" : selected !== null && idx === selected && selected !== q.correct ? "✗" : String.fromCharCode(65 + idx)}
              </span>
              {answer}
            </button>
          );
        })}
      </div>

      {/* Hint */}
      {showHint && (
        <div className={`rounded-2xl p-4 mb-4 flex items-start gap-3 pop-in ${selected === q.correct ? "bg-green-50 border-2 border-green-200" : "bg-orange-50 border-2 border-orange-200"}`}>
          <span className="text-xl">{selected === q.correct ? "✅" : "💡"}</span>
          <div>
            <p className={`font-black text-sm ${selected === q.correct ? "text-green-800" : "text-orange-800"}`}>
              {selected === q.correct ? "Правильно!" : "Не совсем..."}
            </p>
            <p className={`text-sm font-semibold mt-0.5 ${selected === q.correct ? "text-green-700" : "text-orange-700"}`}>
              {q.hint}
            </p>
          </div>
        </div>
      )}

      {/* Next button */}
      {selected !== null && (
        <button
          onClick={handleNext}
          className="btn-game btn-orange w-full flex items-center justify-center gap-2 pop-in"
        >
          {current + 1 >= questions.length ? (
            <><Icon name="Trophy" size={18} /> Посмотреть результат</>
          ) : (
            <><Icon name="ArrowRight" size={18} /> Следующий вопрос</>
          )}
        </button>
      )}
    </div>
  );
}
