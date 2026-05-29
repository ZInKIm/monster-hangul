export type Consonant = {
  char: string;
  emoji: string;
  color: string;
  label: string;
};

export type Vowel = {
  char: string;
  emoji: string;
  color: string;
  label: string;
};

export type Monster = {
  consonant: string;
  vowel: string;
  syllable: string;
  monsterName: string;
  emoji: string;
  color: string;
  evolved?: boolean;
  evolutionCount?: number;
};

export const CONSONANTS: Consonant[] = [
  { char: "ㄱ", emoji: "🦊", color: "bg-orange-400", label: "Giyeok" },
  { char: "ㄴ", emoji: "🐢", color: "bg-green-400", label: "Nieun" },
  { char: "ㄷ", emoji: "🦕", color: "bg-teal-400", label: "Digeut" },
  { char: "ㄹ", emoji: "🐉", color: "bg-purple-400", label: "Rieul" },
  { char: "ㅁ", emoji: "🐻", color: "bg-yellow-500", label: "Mieum" },
  { char: "ㅂ", emoji: "🦋", color: "bg-blue-400", label: "Bieup" },
  { char: "ㅅ", emoji: "🐺", color: "bg-gray-400", label: "Siot" },
  { char: "ㅇ", emoji: "🐼", color: "bg-slate-400", label: "Ieung" },
  { char: "ㅈ", emoji: "🦒", color: "bg-amber-400", label: "Jieut" },
  { char: "ㅊ", emoji: "🦜", color: "bg-lime-400", label: "Chieut" },
  { char: "ㅋ", emoji: "🦁", color: "bg-red-400", label: "Kieuk" },
  { char: "ㅌ", emoji: "🐯", color: "bg-orange-500", label: "Tieut" },
  { char: "ㅍ", emoji: "🦄", color: "bg-pink-400", label: "Pieup" },
  { char: "ㅎ", emoji: "🐨", color: "bg-emerald-400", label: "Hieut" },
];

export const VOWELS: Vowel[] = [
  { char: "ㅏ", emoji: "⭐", color: "bg-pink-400", label: "A" },
  { char: "ㅐ", emoji: "🌸", color: "bg-rose-400", label: "Ae" },
  { char: "ㅑ", emoji: "🌟", color: "bg-yellow-400", label: "Ya" },
  { char: "ㅓ", emoji: "🍀", color: "bg-green-400", label: "Eo" },
  { char: "ㅔ", emoji: "🌺", color: "bg-red-400", label: "E" },
  { char: "ㅗ", emoji: "🌙", color: "bg-blue-400", label: "O" },
  { char: "ㅛ", emoji: "☀️", color: "bg-orange-400", label: "Yo" },
  { char: "ㅜ", emoji: "💧", color: "bg-cyan-400", label: "U" },
  { char: "ㅠ", emoji: "❄️", color: "bg-sky-400", label: "Yu" },
  { char: "ㅣ", emoji: "🔮", color: "bg-violet-400", label: "I" },
];

export const CODA: { char: string; label: string }[] = [
  { char: "", label: "없음" },
  { char: "ㄱ", label: "ㄱ" },
  { char: "ㄴ", label: "ㄴ" },
  { char: "ㄹ", label: "ㄹ" },
  { char: "ㅁ", label: "ㅁ" },
  { char: "ㅂ", label: "ㅂ" },
  { char: "ㅇ", label: "ㅇ" },
];

// 한글 조합 함수
export function combineHangul(consonant: string, vowel: string, coda: string = ""): string {
  const chosung = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
  const jungsung = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
  const jongsung = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

  const cho = chosung.indexOf(consonant);
  const jung = jungsung.indexOf(vowel);
  const jong = jongsung.indexOf(coda);

  if (cho === -1 || jung === -1 || jong === -1) return consonant + vowel + coda;

  const code = 0xAC00 + (cho * 21 + jung) * 28 + jong;
  return String.fromCharCode(code);
}

export const MONSTERS: Monster[] = [
  // ㄱ
  { consonant: "ㄱ", vowel: "ㅏ", syllable: "가", monsterName: "Gamon", emoji: "🦊⭐", color: "bg-orange-300" },
  { consonant: "ㄱ", vowel: "ㅗ", syllable: "고", monsterName: "Gomon", emoji: "🦊🌙", color: "bg-orange-300" },
  { consonant: "ㄱ", vowel: "ㅜ", syllable: "구", monsterName: "Gumon", emoji: "🦊💧", color: "bg-orange-300" },
  { consonant: "ㄱ", vowel: "ㅣ", syllable: "기", monsterName: "Gimon", emoji: "🦊🔮", color: "bg-orange-300" },
  // ㄴ
  { consonant: "ㄴ", vowel: "ㅏ", syllable: "나", monsterName: "Namon", emoji: "🐢⭐", color: "bg-green-300" },
  { consonant: "ㄴ", vowel: "ㅗ", syllable: "노", monsterName: "Nomon", emoji: "🐢🌙", color: "bg-green-300" },
  { consonant: "ㄴ", vowel: "ㅜ", syllable: "누", monsterName: "Numon", emoji: "🐢💧", color: "bg-green-300" },
  { consonant: "ㄴ", vowel: "ㅣ", syllable: "니", monsterName: "Nimon", emoji: "🐢🔮", color: "bg-green-300" },
  // ㄷ
  { consonant: "ㄷ", vowel: "ㅏ", syllable: "다", monsterName: "Damon", emoji: "🦕⭐", color: "bg-teal-300" },
  { consonant: "ㄷ", vowel: "ㅗ", syllable: "도", monsterName: "Domon", emoji: "🦕🌙", color: "bg-teal-300" },
  { consonant: "ㄷ", vowel: "ㅜ", syllable: "두", monsterName: "Dumon", emoji: "🦕💧", color: "bg-teal-300" },
  { consonant: "ㄷ", vowel: "ㅣ", syllable: "디", monsterName: "Dimon", emoji: "🦕🔮", color: "bg-teal-300" },
  // ㄹ
  { consonant: "ㄹ", vowel: "ㅏ", syllable: "라", monsterName: "Ramon", emoji: "🐉⭐", color: "bg-purple-300" },
  { consonant: "ㄹ", vowel: "ㅗ", syllable: "로", monsterName: "Romon", emoji: "🐉🌙", color: "bg-purple-300" },
  { consonant: "ㄹ", vowel: "ㅜ", syllable: "루", monsterName: "Rumon", emoji: "🐉💧", color: "bg-purple-300" },
  { consonant: "ㄹ", vowel: "ㅣ", syllable: "리", monsterName: "Rimon", emoji: "🐉🔮", color: "bg-purple-300" },
  // ㅁ
  { consonant: "ㅁ", vowel: "ㅏ", syllable: "마", monsterName: "Mamon", emoji: "🐻⭐", color: "bg-yellow-300" },
  { consonant: "ㅁ", vowel: "ㅗ", syllable: "모", monsterName: "Momon", emoji: "🐻🌙", color: "bg-yellow-300" },
  { consonant: "ㅁ", vowel: "ㅜ", syllable: "무", monsterName: "Mumon", emoji: "🐻💧", color: "bg-yellow-300" },
  { consonant: "ㅁ", vowel: "ㅣ", syllable: "미", monsterName: "Mimon", emoji: "🐻🔮", color: "bg-yellow-300" },
  // ㅂ
  { consonant: "ㅂ", vowel: "ㅏ", syllable: "바", monsterName: "Bamon", emoji: "🦋⭐", color: "bg-blue-300" },
  { consonant: "ㅂ", vowel: "ㅗ", syllable: "보", monsterName: "Bomon", emoji: "🦋🌙", color: "bg-blue-300" },
  { consonant: "ㅂ", vowel: "ㅜ", syllable: "부", monsterName: "Bumon", emoji: "🦋💧", color: "bg-blue-300" },
  { consonant: "ㅂ", vowel: "ㅣ", syllable: "비", monsterName: "Bimon", emoji: "🦋🔮", color: "bg-blue-300" },
  // ㅅ
  { consonant: "ㅅ", vowel: "ㅏ", syllable: "사", monsterName: "Samon", emoji: "🐺⭐", color: "bg-gray-300" },
  { consonant: "ㅅ", vowel: "ㅗ", syllable: "소", monsterName: "Somon", emoji: "🐺🌙", color: "bg-gray-300" },
  { consonant: "ㅅ", vowel: "ㅜ", syllable: "수", monsterName: "Sumon", emoji: "🐺💧", color: "bg-gray-300" },
  { consonant: "ㅅ", vowel: "ㅣ", syllable: "시", monsterName: "Simon", emoji: "🐺🔮", color: "bg-gray-300" },
  // ㅇ
  { consonant: "ㅇ", vowel: "ㅏ", syllable: "아", monsterName: "Amon", emoji: "🐼⭐", color: "bg-slate-300" },
  { consonant: "ㅇ", vowel: "ㅗ", syllable: "오", monsterName: "Omon", emoji: "🐼🌙", color: "bg-slate-300" },
  { consonant: "ㅇ", vowel: "ㅜ", syllable: "우", monsterName: "Umon", emoji: "🐼💧", color: "bg-slate-300" },
  { consonant: "ㅇ", vowel: "ㅣ", syllable: "이", monsterName: "Imon", emoji: "🐼🔮", color: "bg-slate-300" },
  // ㅈ
  { consonant: "ㅈ", vowel: "ㅏ", syllable: "자", monsterName: "Jamon", emoji: "🦒⭐", color: "bg-amber-300" },
  { consonant: "ㅈ", vowel: "ㅗ", syllable: "조", monsterName: "Jomon", emoji: "🦒🌙", color: "bg-amber-300" },
  { consonant: "ㅈ", vowel: "ㅜ", syllable: "주", monsterName: "Jumon", emoji: "🦒💧", color: "bg-amber-300" },
  { consonant: "ㅈ", vowel: "ㅣ", syllable: "지", monsterName: "Jimon", emoji: "🦒🔮", color: "bg-amber-300" },
  // ㅊ
  { consonant: "ㅊ", vowel: "ㅏ", syllable: "차", monsterName: "Chamon", emoji: "🦜⭐", color: "bg-lime-300" },
  { consonant: "ㅊ", vowel: "ㅗ", syllable: "초", monsterName: "Chomon", emoji: "🦜🌙", color: "bg-lime-300" },
  { consonant: "ㅊ", vowel: "ㅜ", syllable: "추", monsterName: "Chumon", emoji: "🦜💧", color: "bg-lime-300" },
  { consonant: "ㅊ", vowel: "ㅣ", syllable: "치", monsterName: "Chimon", emoji: "🦜🔮", color: "bg-lime-300" },
  // ㅋ
  { consonant: "ㅋ", vowel: "ㅏ", syllable: "카", monsterName: "Kamon", emoji: "🦁⭐", color: "bg-red-300" },
  { consonant: "ㅋ", vowel: "ㅗ", syllable: "코", monsterName: "Komon", emoji: "🦁🌙", color: "bg-red-300" },
  { consonant: "ㅋ", vowel: "ㅜ", syllable: "쿠", monsterName: "Kumon", emoji: "🦁💧", color: "bg-red-300" },
  { consonant: "ㅋ", vowel: "ㅣ", syllable: "키", monsterName: "Kimon", emoji: "🦁🔮", color: "bg-red-300" },
  // ㅌ
  { consonant: "ㅌ", vowel: "ㅏ", syllable: "타", monsterName: "Tamon", emoji: "🐯⭐", color: "bg-orange-200" },
  { consonant: "ㅌ", vowel: "ㅗ", syllable: "토", monsterName: "Tomon", emoji: "🐯🌙", color: "bg-orange-200" },
  { consonant: "ㅌ", vowel: "ㅜ", syllable: "투", monsterName: "Tumon", emoji: "🐯💧", color: "bg-orange-200" },
  { consonant: "ㅌ", vowel: "ㅣ", syllable: "티", monsterName: "Timon", emoji: "🐯🔮", color: "bg-orange-200" },
  // ㅍ
  { consonant: "ㅍ", vowel: "ㅏ", syllable: "파", monsterName: "Pamon", emoji: "🦄⭐", color: "bg-pink-300" },
  { consonant: "ㅍ", vowel: "ㅗ", syllable: "포", monsterName: "Pomon", emoji: "🦄🌙", color: "bg-pink-300" },
  { consonant: "ㅍ", vowel: "ㅜ", syllable: "푸", monsterName: "Pumon", emoji: "🦄💧", color: "bg-pink-300" },
  { consonant: "ㅍ", vowel: "ㅣ", syllable: "피", monsterName: "Pimon", emoji: "🦄🔮", color: "bg-pink-300" },
  // ㅎ
  { consonant: "ㅎ", vowel: "ㅏ", syllable: "하", monsterName: "Hamon", emoji: "🐨⭐", color: "bg-emerald-300" },
  { consonant: "ㅎ", vowel: "ㅗ", syllable: "호", monsterName: "Homon", emoji: "🐨🌙", color: "bg-emerald-300" },
  { consonant: "ㅎ", vowel: "ㅜ", syllable: "후", monsterName: "Humon", emoji: "🐨💧", color: "bg-emerald-300" },
  { consonant: "ㅎ", vowel: "ㅣ", syllable: "히", monsterName: "Himon", emoji: "🐨🔮", color: "bg-emerald-300" },
];

export function getMonster(consonant: string, vowel: string): Monster | undefined {
  return MONSTERS.find((m) => m.consonant === consonant && m.vowel === vowel);
}