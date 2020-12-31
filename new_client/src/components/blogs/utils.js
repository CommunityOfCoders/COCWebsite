import DOMPurify from "dompurify";
import marked from "marked";

export const sanitizeHTML = (dangerousText) => {
  return DOMPurify.sanitize(dangerousText);
};

export const markdownRender = (sanitizedInput) => {
  return {
    __html: marked(sanitizedInput),
  };
};

export const calculateReadingTime = (content) => {
  const wordsPerMinute = 228;
  const wordCount = content.replace(/[^\w ]/g, "").split(/\s+/).length;
  const readingTimeInMinutes = Math.floor(wordCount / wordsPerMinute) + 1;
  const readingTimeAsString = readingTimeInMinutes + " min";

  return readingTimeAsString;
};
