import { bench, describe } from "vitest";
import { parseFrontmatterBlock } from "./frontmatter.js";

const yamlFrontmatter = `---
title: OpenClaw Configuration Guide
description: A comprehensive guide to configuring your personal AI assistant
author: openclaw
version: 2.0.0
tags: [ai, assistant, configuration]
date: 2026-01-15
---

# Content starts here
`;

const keyValueFrontmatter = `---
title: Quick Setup
description: Get started in minutes
author: openclaw
---

# Quick Setup Guide
`;

const multiLineFrontmatter = `---
title: Advanced Configuration
description:
  This is a multi-line description that spans
  multiple indented lines for testing purposes
author: openclaw team
version: 3.0.0
---

# Advanced Configuration
`;

const noFrontmatter = `# Just a Regular Markdown File

This document has no frontmatter at all.
`;

describe("parseFrontmatterBlock", () => {
  bench("YAML frontmatter", () => {
    parseFrontmatterBlock(yamlFrontmatter);
  });

  bench("key-value frontmatter", () => {
    parseFrontmatterBlock(keyValueFrontmatter);
  });

  bench("multi-line values", () => {
    parseFrontmatterBlock(multiLineFrontmatter);
  });

  bench("no frontmatter", () => {
    parseFrontmatterBlock(noFrontmatter);
  });
});
