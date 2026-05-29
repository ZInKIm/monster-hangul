"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { CONSONANTS, VOWELS, getMonster } from "@/data/monsters";
import { useCollection } from "@/hooks/useCollection";
import MonsterCard from "@/components/MonsterCard";
import FusionAnimation from "@/components/FusionAnimation";
import MonsterResult from "@/components/MonsterResult";

type Step = "select" | "fusing" | "result";

export default function LearnPage() {
  const router = useRouter();
  const { addMonster, isEvolved, getCount } = useCollection();
  const [selectedConsonant, setSelectedConsonant] = useState<string | null>(null);
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null);
  const [step, setStep] = useState<Step>("select");
  const [evolvedResult, setEvolvedResult] = useState(false);

  const consonant = CONSONANTS.find((c) => c.char === selectedConsonant);
  const vowel = VOWELS.find((v) => v.char === selectedVowel);
  const monster = selectedConsonant && selectedVowel
    ? getMonster(selectedConsonant, selectedVowel)
    : undefined;

  const handleFuse = () => {
    if (!selectedConsonant || !selectedVowel) return;
    setStep("fusing");
  };

  const handleFusionComplete = useCallback(() => {
    if (monster) {
      const { isEvolved } = addMonster(monster.syllable);
      setEvolvedResult(isEvolved);
    }
    setStep("result");
  }, [monster, addMonster]);

  const handleReset = () => {
    setSelectedConsonant(null);
    setSelectedVowel(null);
    setStep("select");
    setEvolvedResult(false);
  };

  return (
    <div className="min-h-screen">
      <button onClick={() => router.push("/")} className="text-white opacity-70 mb-4 text-sm">
        ← Back
      </button>

      {step === "select" && (
        <div className="flex flex-col gap-6">
          <h2 className="text-white text-2xl font-black text-center">
            Choose a Consonant Monster
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {CONSONANTS.map((c) => (
              <MonsterCard
                key={c.char}
                {...c}
                selected={selectedConsonant === c.char}
                onClick={() => setSelectedConsonant(c.char)}
              />
            ))}
          </div>

          <h2 className="text-white text-2xl font-black text-center">
            Choose a Vowel Monster
          </h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {VOWELS.map((v) => (
              <MonsterCard
                key={v.char}
                {...v}
                selected={selectedVowel === v.char}
                onClick={() => setSelectedVowel(v.char)}
              />
            ))}
          </div>

          <button
            onClick={handleFuse}
            disabled={!selectedConsonant || !selectedVowel}
            className="bg-yellow-400 disabled:opacity-40 text-purple-900 font-black text-2xl py-5 rounded-2xl shadow-lg hover:scale-105 transition-transform disabled:hover:scale-100"
          >
            💥 FUSE!
          </button>
        </div>
      )}

      {step === "fusing" && consonant && vowel && (
        <FusionAnimation
          consonantEmoji={consonant.emoji}
          consonantChar={consonant.char}
          vowelEmoji={vowel.emoji}
          vowelChar={vowel.char}
          onComplete={handleFusionComplete}
        />
      )}

      {step === "result" && monster && (
        <MonsterResult
          syllable={monster.syllable}
          monsterName={monster.monsterName}
          emoji={monster.emoji}
          color={monster.color}
          isEvolved={evolvedResult}
          evolutionCount={getCount(monster.syllable)}
          onReset={handleReset}
        />
      )}
    </div>
  );
}