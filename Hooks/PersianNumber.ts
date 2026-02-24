export default function PersianNumber(num: number | string): string {
  const number = String(num);
  let arr: string[] = [];
  for (let index = 0; index < number.length; index++) {
    const element = number[index];
    switch (element) {
      case "0":
        arr[index] = "۰";
        break;
      case "1":
        arr[index] = "۱";
        break;
      case "2":
        arr[index] = "۲";
        break;
      case "3":
        arr[index] = "۳";
        break;
      case "4":
        arr[index] = "۴";
        break;
      case "5":
        arr[index] = "۵";
        break;
      case "6":
        arr[index] = "۶";
        break;
      case "7":
        arr[index] = "۷";
        break;
      case "8":
        arr[index] = "۸";
        break;
      case "9":
        arr[index] = "۹";
        break;
      default:
        arr[index] = element;
        break;
    }
  }

  let result = "";
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    result += arr[i];
    if ((len - i - 1) > 0 && (len - i - 1) % 3 === 0) {
      result += ",";
    }
  }
  return result;
}
