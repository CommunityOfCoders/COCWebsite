export const overflowEllipsis = (givenString) => {
  const numberOfChars = 150;
  if (givenString.length > 150) {
    return givenString.substring(0, numberOfChars - 3) + "...";
  }
  return givenString;
};
