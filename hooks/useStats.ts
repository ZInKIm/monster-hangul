"use client";
import { useState, useEffect } from "react";

const STATS_KEY = "monster-hangul-stats";

export type DailyStats = {
  date: string;
  learned: number;
  correct: number;
  wrong: number;
};

export function useStats() {
  const [stats, setStats] = useState<DailyStats[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STATS_KEY);
    if (saved) setStats(JSON.parse(saved));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const todayStats = stats.find((s) => s.date === today) || {
    date: today,
    learned: 0,
    correct: 0,
    wrong: 0,
  };

  const recordLearned = () => {
    setStats((prev) => {
      const existing = prev.find((s) => s.date === today);
      const next = existing
        ? prev.map((s) =>
            s.date === today ? { ...s, learned: s.learned + 1 } : s
          )
        : [...prev, { date: today, learned: 1, correct: 0, wrong: 0 }];
      localStorage.setItem(STATS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const recordQuiz = (correct: boolean) => {
    setStats((prev) => {
      const existing = prev.find((s) => s.date === today);
      const next = existing
        ? prev.map((s) =>
            s.date === today
              ? {
                  ...s,
                  correct: correct ? s.correct + 1 : s.correct,
                  wrong: correct ? s.wrong : s.wrong + 1,
                }
              : s
          )
        : [
            ...prev,
            {
              date: today,
              learned: 0,
              correct: correct ? 1 : 0,
              wrong: correct ? 0 : 1,
            },
          ];
      localStorage.setItem(STATS_KEY, JSON.stringify(next));
      return next;
    });
  };

  const totalCorrect = stats.reduce((a, b) => a + b.correct, 0);
  const totalWrong = stats.reduce((a, b) => a + b.wrong, 0);
  const accuracy =
    totalCorrect + totalWrong > 0
      ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100)
      : 0;

  return {
    stats,
    todayStats,
    recordLearned,
    recordQuiz,
    totalCorrect,
    totalWrong,
    accuracy,
  };
}