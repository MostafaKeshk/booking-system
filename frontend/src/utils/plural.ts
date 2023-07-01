export const plural = (word: string): string => {
  // check if the word ends with certain suffixes and add appropriate plural suffix
  if (
    word.endsWith("s") ||
    word.endsWith("x") ||
    word.endsWith("z") ||
    word.endsWith("ch") ||
    word.endsWith("sh")
  ) {
    return word + "es";
  }
  // check if the word ends with 'y' preceded by a consonant and replace 'y' with 'ies'
  else if (
    word.endsWith("y") &&
    !["a", "e", "i", "o", "u"].includes(word[word.length - 2])
  ) {
    return word.slice(0, -1) + "ies";
  }
  // add 's' suffix for all other cases
  else {
    return word + "s";
  }
};
