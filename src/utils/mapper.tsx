import { PageList } from "../types";

export function getMappedSentence(page: PageList) {
  if (page) {
    let sentence = page.content;
    let tokens = page.tokens;
    let sortedTokens = tokens
      .slice()
      .sort((a, b) => b.position[1] - a.position[1]);

    for (let token of sortedTokens) {
      sentence =
        sentence.slice(0, token.position[0]) +
        `<span id="${token.position[0]}">${sentence.slice(
          token.position[0],
          token.position[1]
        )}</span>` +
        sentence.slice(token.position[1]);
    }

    return { sentence };
  }
  return { sentence: "" };
}
