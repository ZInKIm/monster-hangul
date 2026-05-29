"use client";
import { useRouter } from "next/navigation";
import { MONSTERS } from "@/data/monsters";
import { useCollection } from "@/hooks/useCollection";

export default function CollectionPage() {
  const router = useRouter();
  const { hasMonster } = useCollection();

  const collected = MONSTERS.filter((m) => hasMonster(m.syllable)).length;

  return (
    <div className="min-h-screen">
      <button onClick={() => router.push("/")} className="text-white opacity-70 mb-4 text-sm">
        ← Back
      </button>

      <h1 className="text-white text-3xl font-black text-center mb-2">Monster Collection</h1>
      <p className="text-purple-200 text-center mb-6">{collected} / {MONSTERS.length} caught!</p>

      <div className="grid grid-cols-3 gap-3">
        {MONSTERS.map((m) => {
          const caught = hasMonster(m.syllable);
          return (
            <div
              key={m.syllable}
              className={`
                ${caught ? m.color : "bg-gray-600"}
                rounded-2xl p-3 flex flex-col items-center gap-1
                transition-all duration-300
              `}
            >
              <span className="text-3xl">{caught ? m.emoji : "❓"}</span>
              <span className={`text-2xl font-black ${caught ? "text-white" : "text-gray-400"}`}>
                {m.syllable}
              </span>
              <span className={`text-xs ${caught ? "text-white opacity-80" : "text-gray-500"}`}>
                {caught ? m.monsterName : "???"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}