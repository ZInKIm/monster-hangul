"use client";
import { useRouter } from "next/navigation";
import { useCollection } from "@/hooks/useCollection";
import { useStats } from "@/hooks/useStats";
import { MONSTERS } from "@/data/monsters";

export default function ParentPage() {
  const router = useRouter();
  const { collected, isEvolved } = useCollection();
  const { todayStats, stats, accuracy } = useStats();

  const evolvedCount = MONSTERS.filter((m) => isEvolved(m.syllable)).length;
  const totalMonsters = MONSTERS.length;

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dateStr = d.toISOString().split("T")[0];
    const found = stats.find((s) => s.date === dateStr);
    return {
      date: dateStr,
      label: d.toLocaleDateString("en", { weekday: "short" }),
      learned: found?.learned || 0,
      correct: found?.correct || 0,
      wrong: found?.wrong || 0,
    };
  });

  const maxLearned = Math.max(...last7Days.map((d) => d.learned), 1);

  return (
    <div className="min-h-screen">
      <button
        onClick={() => router.push("/")}
        className="text-white opacity-70 mb-4 text-sm"
      >
        ← Back
      </button>

      <h1 className="text-white text-3xl font-black text-center mb-6">
        👨‍👩‍👧 Parent Dashboard
      </h1>

      {/* 오늘 요약 */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-yellow-300">{todayStats.learned}</p>
          <p className="text-white text-xs mt-1">Today&apos;s Learned</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-green-300">{todayStats.correct}</p>
          <p className="text-white text-xs mt-1">Correct</p>
        </div>
        <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
          <p className="text-3xl font-black text-pink-300">{accuracy}%</p>
          <p className="text-white text-xs mt-1">Accuracy</p>
        </div>
      </div>

      {/* 컬렉션 진행도 */}
      <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-6">
        <h2 className="text-white font-black text-lg mb-3">📖 Collection Progress</h2>
        <div className="flex justify-between text-white text-sm mb-2">
          <span>Monsters Caught</span>
          <span>{collected.length} / {totalMonsters}</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-4 mb-3">
          <div
            className="bg-yellow-400 h-4 rounded-full transition-all duration-700"
            style={{ width: `${(collected.length / totalMonsters) * 100}%` }}
          />
        </div>
        <div className="flex justify-between text-white text-sm mb-2">
          <span>⚡ Evolved Monsters</span>
          <span>{evolvedCount} / {totalMonsters}</span>
        </div>
        <div className="w-full bg-white bg-opacity-20 rounded-full h-4">
          <div
            className="bg-purple-400 h-4 rounded-full transition-all duration-700"
            style={{ width: `${(evolvedCount / totalMonsters) * 100}%` }}
          />
        </div>
      </div>

      {/* 7일 학습 그래프 */}
      <div className="bg-white bg-opacity-20 rounded-2xl p-4 mb-6">
        <h2 className="text-white font-black text-lg mb-4">📈 Last 7 Days</h2>
        <div className="flex items-end gap-2 h-32">
          {last7Days.map((d) => (
            <div key={d.date} className="flex flex-col items-center flex-1 gap-1">
              <div
                className="w-full bg-yellow-400 rounded-t-lg transition-all duration-700"
                style={{ height: `${(d.learned / maxLearned) * 100}%`, minHeight: d.learned > 0 ? "8px" : "0" }}
              />
              <span className="text-white text-xs">{d.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 퀴즈 성적 */}
      <div className="bg-white bg-opacity-20 rounded-2xl p-4">
        <h2 className="text-white font-black text-lg mb-3">🧠 Quiz Results</h2>
        <div className="flex gap-4">
          <div className="flex-1 bg-green-400 bg-opacity-40 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-green-300">
              {stats.reduce((a, b) => a + b.correct, 0)}
            </p>
            <p className="text-white text-xs">Total Correct</p>
          </div>
          <div className="flex-1 bg-red-400 bg-opacity-40 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-red-300">
              {stats.reduce((a, b) => a + b.wrong, 0)}
            </p>
            <p className="text-white text-xs">Total Wrong</p>
          </div>
          <div className="flex-1 bg-blue-400 bg-opacity-40 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-blue-300">{accuracy}%</p>
            <p className="text-white text-xs">Accuracy</p>
          </div>
        </div>
      </div>
    </div>
  );
}