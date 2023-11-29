export const padWithZero = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
} 