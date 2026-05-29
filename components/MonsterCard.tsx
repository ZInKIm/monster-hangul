"use client";

type Props = {
  char: string;
  emoji: string;
  color: string;
  label: string;
  selected: boolean;
  onClick: () => void;
};

export default function MonsterCard({ char, emoji, color, label, selected, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={`
        flex flex-col items-center justify-center
        w-24 h-24 rounded-2xl text-white font-bold
        transition-all duration-200 shadow-lg
        ${color}
        ${selected ? "scale-110 ring-4 ring-white ring-offset-2" : "hover:scale-105"}
      `}
    >
      <span className="text-3xl">{emoji}</span>
      <span className="text-2xl font-black">{char}</span>
      <span className="text-xs opacity-80">{label}</span>
    </button>
  );
}