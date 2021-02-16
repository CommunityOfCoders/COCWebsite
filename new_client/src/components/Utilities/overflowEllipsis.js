export const overflowEllipsis = (givenString) => {
  const numberOfChars = 150;
  let isOverflow = false;
  let returnString = givenString;

  if (givenString.length > numberOfChars) {
    returnString = givenString.substring(0, numberOfChars - 3) + "...";
    isOverflow = true;
  }

  return { display: returnString, isOverflow: isOverflow };
};
