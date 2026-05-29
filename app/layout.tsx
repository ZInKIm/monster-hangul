import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Monster Hangul",
  description: "Learn Korean through monster fusion!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-b from-indigo-600 to-purple-700 min-h-screen font-sans">
        <main className="max-w-md mx-auto min-h-screen px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}