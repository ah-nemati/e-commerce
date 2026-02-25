const persianDigitsMap: { [key: string]: string } = {
  "0": "۰",
  "1": "۱",
  "2": "۲",
  "3": "۳",
  "4": "۴",
  "5": "۵",
  "6": "۶",
  "7": "۷",
  "8": "۸",
  "9": "۹",
};

export default function PersianNumber(num: number | string): string {
  const sanitizedStr = String(num).replace(/,/g, "");

  const persianStr = sanitizedStr
    .split("")
    .map((char) => persianDigitsMap[char] || char)
    .join("");

  let result = "";
  const len = persianStr.length;
  for (let i = 0; i < len; i++) {
    result += persianStr[i];
    const charsRemaining = len - i - 1;
    if (charsRemaining > 0 && charsRemaining % 3 === 0) {
      result += ",";
    }
  }

  return result;
}
