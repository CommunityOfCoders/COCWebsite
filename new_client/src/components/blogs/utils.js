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
