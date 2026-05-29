"use client";

export function useTTS() {
  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return { speak };
}