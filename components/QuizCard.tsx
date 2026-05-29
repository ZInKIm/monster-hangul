"use client";

type Props = {
  syllable: string;
  emoji: string;
  color: string;
  onClick: () => void;
  disabled: boolean;
  result?: "correct" | "wrong" | null;
};

export default function QuizCard({ syllable, emoji, color, onClick, disabled, result }: Props) {
  const border =
    result === "correct" ? "ring-4 ring-green-400" :
    result === "wrong" ? "ring-4 ring-red-400" : "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${color} ${border}
        flex flex-col items-center justify-center
        w-28 h-28 rounded-2xl text-white font-bold
        shadow-lg transition-all duration-200
        hover:scale-105 disabled:opacity-60
      `}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-3xl font-black">{syllable}</span>
    </button>
  );
}