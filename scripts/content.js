// look for article and tutorial within the doc & return first 
// instance of if
const article = document.querySelector("article");

// `document.querySelector` may return null if the selector doesn't 
// match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression - removes spaces?
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement("p"); // creates html element
  // Use the same styling as the publish information in an article's 
  // header
  badge.classList.add("color-secondary-text", "type--caption");
  badge.textContent = `⏱️ ${readingTime} min read`; // set text 
  // content of badge elem

  // Support for API reference docs
  const heading = article.querySelector("h1");
  // Support for article docs with date
  const date = article.querySelector("time")?.parentNode;

  // nullish coalescing operator - logical operator that returns 
  // rhs when lhs is null/undef otherwise return rhs fifth lowest 
  // operator precedence, can't combine w && and || wout ()
  (date ?? heading).insertAdjacentElement("afterend", badge);
}