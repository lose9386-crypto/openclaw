import { bench, describe } from "vitest";
import { stripReasoningTagsFromText } from "./reasoning-tags.js";

const textWithThinkingTags = `<thinking>
This is the model's internal reasoning process.
It considers multiple approaches to the problem.
Let me think through this step by step.
</thinking>

Here is the actual response that the user should see.
It contains useful information about the topic.`;

const textWithNestedCode = `<thinking>
The user wants to strip tags from text.
</thinking>

Here is a code example:

\`\`\`html
<thinking>This should NOT be stripped</thinking>
\`\`\`

And an inline example: \`<thinking>also preserved</thinking>\`

The rest of the response.`;

const textWithMultipleTags = `<thought>First reasoning block</thought>
First response part.
<thinking>Second reasoning block with more content
that spans multiple lines.</thinking>
Second response part.
<antthinking>Third reasoning block</antthinking>
Final response.`;

const plainText = `This is a regular response with no reasoning tags at all.
It has multiple lines and paragraphs of content.
The function should return it unchanged quickly.`;

const textWithFinalTags = `<thinking>Internal reasoning</thinking>
<final>Summary of the answer</final>
The main response content here.`;

describe("stripReasoningTagsFromText", () => {
  bench("text with thinking tags", () => {
    stripReasoningTagsFromText(textWithThinkingTags);
  });

  bench("text with nested code blocks", () => {
    stripReasoningTagsFromText(textWithNestedCode);
  });

  bench("text with multiple tag types", () => {
    stripReasoningTagsFromText(textWithMultipleTags);
  });

  bench("plain text (no tags)", () => {
    stripReasoningTagsFromText(plainText);
  });

  bench("text with final tags", () => {
    stripReasoningTagsFromText(textWithFinalTags);
  });

  bench("text with thinking tags (preserve mode)", () => {
    stripReasoningTagsFromText(textWithThinkingTags, { mode: "preserve" });
  });
});
