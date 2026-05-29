"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { MONSTERS } from "@/data/monsters";
import { useTTS } from "@/hooks/useTTS";
import QuizCard from "@/components/QuizCard";

type Difficulty = "easy" | "hard";
type GameState = "select" | "playing" | "gameover";

function getRandomMonsters(count: number) {
  const shuffled = [...MONSTERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

const DIFFICULTY_SETTINGS = {
  easy: { time: 15, choices: 3, label: "😊 Easy", color: "bg-green-400" },
  hard: { time: 7, choices: 5, label: "🔥 Hard", color: "bg-red-400" },
};

export default function QuizPage() {
  const router = useRouter();
  const { speak } = useTTS();

  const [gameState, setGameState] = useState<GameState>("select");
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [stars, setStars] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(15);
  const [choices, setChoices] = useState(getRandomMonsters(3));
  const [answer, setAnswer] = useState(choices[0]);
  const [selected, setSelected] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const settings = DIFFICULTY_SETTINGS[difficulty];

  const newQuestion = useCallback(() => {
    const newChoices = getRandomMonsters(settings.choices);
    setChoices(newChoices);
    setAnswer(newChoices[Math.floor(Math.random() * newChoices.length)]);
    setSelected(null);
    setTimeLeft(settings.time);
  }, [settings]);

  // 타이머
  useEffect(() => {
    if (gameState !== "playing" || selected) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          // 시간 초과 = 오답 처리
          setLives((l) => {
            const next = l - 1;
            if (next <= 0) setGameState("gameover");
            return next;
          });
          setSelected("__timeout__");
          setTimeout(newQuestion, 1500);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [gameState, selected, newQuestion]);

  useEffect(() => {
    if (gameState === "playing") speak(answer.syllable);
  }, [answer, gameState, speak]);

  const handleStart = (diff: Difficulty) => {
    setDifficulty(diff);
    const s = DIFFICULTY_SETTINGS[diff];
    const newChoices = getRandomMonsters(s.choices);
    setChoices(newChoices);
    setAnswer(newChoices[Math.floor(Math.random() * newChoices.length)]);
    setStars(0);
    setStreak(0);
    setLives(3);
    setTimeLeft(s.time);
    setSelected(null);
    setGameState("playing");
  };

  const handleSelect = (syllable: string) => {
    if (selected || gameState !== "playing") return;
    clearInterval(timerRef.current!);
    setSelected(syllable);

    if (syllable === answer.syllable) {
      setStars((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
      setLives((l) => {
        const next = l - 1;
        if (next <= 0) {
          setTimeout(() => setGameState("gameover"), 1500);
        }
        return next;
      });
    }
    if (lives > 1 || syllable === answer.syllable) {
      setTimeout(newQuestion, 1500);
    }
  };

  const timerPercent = (timeLeft / settings.time) * 100;
  const timerColor = timerPercent > 50 ? "bg-green-400" : timerPercent > 25 ? "bg-yellow-400" : "bg-red-400";

  // 난이도 선택 화면
  if (gameState === "select") {
    return (
      <div className="min-h-screen flex flex-col">
        <button onClick={() => router.push("/")} className="text-white opacity-70 mb-4 text-sm">
          ← Back
        </button>
        <div className="flex flex-col items-center justify-center flex-1 gap-8">
          <h1 className="text-white text-4xl font-black">Choose Difficulty</h1>
          <div className="flex flex-col gap-4 w-full max-w-xs">
            <button
              onClick={() => handleStart("easy")}
              className="bg-green-400 text-white font-black text-2xl py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              😊 Easy
              <p className="text-sm font-normal mt-1">15 seconds · 3 choices</p>
            </button>
            <button
              onClick={() => handleStart("hard")}
              className="bg-red-400 text-white font-black text-2xl py-6 rounded-2xl shadow-lg hover:scale-105 transition-transform"
            >
              🔥 Hard
              <p className="text-sm font-normal mt-1">7 seconds · 5 choices</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 게임오버 화면
  if (gameState === "gameover") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <div className="text-8xl">💀</div>
        <h1 className="text-white text-4xl font-black">Game Over!</h1>
        <div className="bg-white bg-opacity-20 rounded-2xl p-6 text-center">
          <p className="text-white text-2xl font-bold">⭐ Stars: {stars}</p>
          <p className="text-white text-2xl font-bold">🔥 Best Streak: {streak}</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setGameState("select")}
            className="bg-yellow-400 text-purple-900 font-black text-xl px-8 py-4 rounded-2xl hover:scale-105 transition-transform"
          >
            Try Again
          </button>
          <button
            onClick={() => router.push("/")}
            className="bg-white text-purple-700 font-black text-xl px-8 py-4 rounded-2xl hover:scale-105 transition-transform"
          >
            Home
          </button>
        </div>
      </div>
    );
  }

  // 게임 화면
  return (
    <div className="min-h-screen flex flex-col">
      <button onClick={() => router.push("/")} className="text-white opacity-70 mb-2 text-sm">
        ← Back
      </button>

      {/* 상태바 */}
      <div className="flex justify-between text-white mb-3">
        <span className="font-bold text-lg">
          {"❤️".repeat(lives)}{"🖤".repeat(3 - lives)}
        </span>
        <span className="font-bold text-lg">⭐ {stars}</span>
        <span className="font-bold text-lg">🔥 {streak}</span>
      </div>

      {/* 타이머 바 */}
      <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mb-6">
        <div
          className={`${timerColor} h-4 rounded-full transition-all duration-1000`}
          style={{ width: `${timerPercent}%` }}
        />
      </div>

      <div className="flex flex-col items-center gap-6">
        <button
          onClick={() => speak(answer.syllable)}
          className="bg-white text-purple-700 font-black text-2xl px-10 py-6 rounded-3xl shadow-xl hover:scale-105 transition-transform"
        >
          🔊 Which monster is this?
          <p className="text-purple-400 text-sm font-normal mt-1">{timeLeft}s remaining</p>
        </button>

        <div className="flex gap-3 justify-center flex-wrap">
          {choices.map((m) => {
            const isAnswer = m.syllable === answer.syllable;
            const isSelected = selected === m.syllable;
            const result = selected
              ? isAnswer ? "correct" : isSelected ? "wrong" : null
              : null;

            return (
              <QuizCard
                key={m.syllable}
                syllable={m.syllable}
                emoji={m.emoji}
                color={m.color}
                onClick={() => handleSelect(m.syllable)}
                disabled={!!selected}
                result={result}
              />
            );
          })}
        </div>

        {selected && (
          <p className={`text-2xl font-black ${selected === answer.syllable ? "text-yellow-300" : "text-red-300"}`}>
            {selected === "__timeout__" ? `⏰ Time's up! It was ${answer.syllable}!` :
             selected === answer.syllable ? "🎉 Correct!" : `❌ It was ${answer.syllable}!`}
          </p>
        )}
      </div>
    </div>
  );
}