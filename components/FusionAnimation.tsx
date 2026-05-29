"use client";
import { useEffect, useState } from "react";

type Props = {
  consonantEmoji: string;
  consonantChar: string;
  vowelEmoji: string;
  vowelChar: string;
  onComplete: () => void;
};

export default function FusionAnimation({
  consonantEmoji, consonantChar,
  vowelEmoji, vowelChar,
  onComplete,
}: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 500);
    const t2 = setTimeout(() => setStep(2), 1200);
    const t3 = setTimeout(() => onComplete(), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div className={`flex items-center gap-6 transition-all duration-500 ${step >= 1 ? "gap-2" : "gap-8"}`}>
        <div className="flex flex-col items-center bg-orange-400 rounded-2xl w-20 h-20 justify-center">
          <span className="text-3xl">{consonantEmoji}</span>
          <span className="text-xl font-black text-white">{consonantChar}</span>
        </div>

        <span className={`text-3xl font-black text-white transition-opacity duration-300 ${step >= 1 ? "opacity-100" : "opacity-0"}`}>
          +
        </span>

        <div className="flex flex-col items-center bg-pink-400 rounded-2xl w-20 h-20 justify-center">
          <span className="text-3xl">{vowelEmoji}</span>
          <span className="text-xl font-black text-white">{vowelChar}</span>
        </div>
      </div>

      {step >= 2 && (
        <div className="text-5xl font-black text-white animate-bounce">
          💥
        </div>
      )}
    </div>
  );
}