"use client";
import { useState, useEffect } from "react";

const STORAGE_KEY = "monster-hangul-collection";
const EVOLUTION_KEY = "monster-hangul-evolution";

export function useCollection() {
  const [collected, setCollected] = useState<string[]>([]);
  const [evolutionCount, setEvolutionCount] = useState<Record<string, number>>({});
  const [evolved, setEvolved] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setCollected(JSON.parse(saved));

    const evo = localStorage.getItem(EVOLUTION_KEY);
    if (evo) {
      const parsed = JSON.parse(evo);
      setEvolutionCount(parsed.count || {});
      setEvolved(parsed.evolved || []);
    }
  }, []);

  const addMonster = (syllable: string): { isNew: boolean; isEvolved: boolean } => {
    let isNew = false;
    let isEvolved = false;

    setCollected((prev) => {
      if (!prev.includes(syllable)) {
        isNew = true;
        const next = [...prev, syllable];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      }
      return prev;
    });

    setEvolutionCount((prev) => {
      const next = { ...prev, [syllable]: (prev[syllable] || 0) + 1 };

      // 3번 획득하면 진화
      if (next[syllable] === 3) {
        isEvolved = true;
        setEvolved((e) => {
          const nextEvolved = [...e, syllable];
          localStorage.setItem(
            EVOLUTION_KEY,
            JSON.stringify({ count: next, evolved: nextEvolved })
          );
          return nextEvolved;
        });
      } else {
        localStorage.setItem(
          EVOLUTION_KEY,
          JSON.stringify({ count: next, evolved })
        );
      }

      return next;
    });

    return { isNew, isEvolved };
  };

  const hasMonster = (syllable: string) => collected.includes(syllable);
  const isEvolved = (syllable: string) => evolved.includes(syllable);
  const getCount = (syllable: string) => evolutionCount[syllable] || 0;

  return { collected, addMonster, hasMonster, isEvolved, getCount };
}