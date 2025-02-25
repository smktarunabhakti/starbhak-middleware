export function twoDigit(num: number): string {

    if (num < 0) {
        return num > -10 ? `-0${Math.abs(num)}` : `${num}`;
    }

  return num < 10 ? `0${num}` : `${num}`;
}