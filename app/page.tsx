import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 text-center">
      <div>
        <div className="text-8xl mb-4">👾</div>
        <h1 className="text-4xl font-black text-white">Monster Hangul</h1>
        <p className="text-purple-200 mt-2 text-lg">Learn Korean the fun way!</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Link
          href="/learn"
          className="bg-yellow-400 text-purple-900 font-black text-xl py-5 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform"
        >
          🎮 Start Learning
        </Link>
        <Link
          href="/collection"
          className="bg-white text-purple-700 font-black text-xl py-5 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform"
        >
          📖 Monster Collection
        </Link>
        <Link
          href="/quiz"
          className="bg-pink-400 text-white font-black text-xl py-5 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform"
        >
          ⭐ Quiz
        </Link>
        <Link
          href="/parent"
          className="bg-indigo-400 text-white font-black text-xl py-5 rounded-2xl text-center shadow-lg hover:scale-105 transition-transform"
        >
          👨‍👩‍👧 Parent Dashboard
        </Link>
      </div>
    </div>
  );
}