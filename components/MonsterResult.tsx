"use client";
import { useTTS } from "@/hooks/useTTS";

type Props = {
  syllable: string;
  monsterName: string;
  emoji: string;
  color: string;
  isEvolved: boolean;
  evolutionCount: number;
  onReset: () => void;
};

export default function MonsterResult({
  syllable, monsterName, emoji, color,
  isEvolved, evolutionCount, onReset
}: Props) {
  const { speak } = useTTS();
  const progress = Math.min(evolutionCount, 3);

  return (
    <div className="flex flex-col items-center gap-6 py-8">

      {isEvolved ? (
        <p className="text-yellow-300 text-xl font-black animate-bounce">
          ⚡ EVOLUTION! ⚡
        </p>
      ) : (
        <p className="text-white text-xl font-bold animate-bounce">
          ✨ New Monster Born! ✨
        </p>
      )}

      <div className={`
        ${isEvolved ? "bg-yellow-400 scale-110" : color}
        rounded-3xl w-48 h-48 flex flex-col items-center justify-center shadow-2xl
        transition-all duration-500
      `}>
        <span className="text-6xl">{isEvolved ? "⚡" : ""}{emoji}</span>
        <span className="text-5xl font-black text-white">{syllable}</span>
        <span className="text-sm text-white opacity-80">
          {isEvolved ? `${monsterName} EX` : monsterName}
        </span>
      </div>

      {/* 진화 게이지 */}
      <div className="w-full max-w-xs">
        <div className="flex justify-between text-white text-sm mb-1">
          <span>Evolution Progress</span>
          <span>{progress} / 3</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
          <div
            className={`${isEvolved ? "bg-yellow-400" : "bg-purple-400"} h-4 rounded-full transition-all duration-700`}
            style={{ width: `${(progress / 3) * 100}%` }}
          />
        </div>
        {isEvolved && (
          <p className="text-yellow-300 text-center text-sm mt-1 font-bold">
            MAX EVOLUTION REACHED! 🌟
          </p>
        )}
      </div>

      <button
        onClick={() => speak(syllable)}
        className="bg-white text-purple-600 font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        🔊 Hear Sound
      </button>

      <button
        onClick={onReset}
        className="bg-purple-500 text-white font-bold px-6 py-3 rounded-full hover:bg-purple-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}