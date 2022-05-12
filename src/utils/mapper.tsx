import { PageList } from "../types";

export function getMappedSentence(page: PageList) {
  /*
   * Check that a valid page is passed
   */

  if (page) {
    let sentence = page.content;
    let tokens = page.tokens;

    /*
     * Sort tokens in reverse order, from end of content to start.
     */
    let sortedTokens = tokens
      .slice()
      .sort((a, b) => b.position[1] - a.position[1]);

    /*
     * Map through all the tokens and splice their IDs to each word of the content
     * This is so that when each word is clicked, the event.target will include the ID
     * Since the IDs are sorted in reverse, there is no need to recalculate the content index
     */
    for (let token of sortedTokens) {
      sentence =
        sentence.slice(0, token.position[0]) +
        `<span id="${token.position[0]}">${sentence.slice(
          token.position[0],
          token.position[1]
        )}</span>` +
        sentence.slice(token.position[1]);
    }

    // return the sentence
    return { sentence };
  }
  // return an empty sentence when page is undefined
  return { sentence: "" };
}
