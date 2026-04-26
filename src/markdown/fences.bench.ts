import { bench, describe } from "vitest";
import { parseFenceSpans } from "./fences.js";

const simpleMarkdown = `# Hello

Some text here.

\`\`\`javascript
const x = 1;
console.log(x);
\`\`\`

More text.
`;

const multipleFences = `# Code Examples

\`\`\`typescript
function hello() {
  return "world";
}
\`\`\`

Some explanation text between fences.

\`\`\`python
def hello():
    return "world"
\`\`\`

Another paragraph.

~~~bash
echo "hello world"
ls -la
~~~

\`\`\`\`markdown
\`\`\`nested
code
\`\`\`
\`\`\`\`

Final text.
`;

const noFences = `# Document Without Code

This is a plain markdown document with no code fences.
It has multiple paragraphs but no fenced code blocks at all.

Just regular text with some **bold** and *italic* formatting.
`;

const largeFencedDocument = Array.from(
  { length: 20 },
  (_, i) => `
\`\`\`javascript
// Block ${i}
const value${i} = ${i};
console.log(value${i});
\`\`\`
`,
).join("\nSome text between blocks.\n");

describe("parseFenceSpans", () => {
  bench("single fence", () => {
    parseFenceSpans(simpleMarkdown);
  });

  bench("multiple mixed fences", () => {
    parseFenceSpans(multipleFences);
  });

  bench("no fences", () => {
    parseFenceSpans(noFences);
  });

  bench("large document with 20 fences", () => {
    parseFenceSpans(largeFencedDocument);
  });
});
