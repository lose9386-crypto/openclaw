import { bench, describe } from "vitest";
import {
  clampNumber,
  escapeRegExp,
  jidToE164,
  normalizeE164,
  safeParseJson,
  sliceUtf16Safe,
  toWhatsappJid,
  truncateUtf16Safe,
} from "./utils.js";

describe("normalizeE164", () => {
  bench("with country code", () => {
    normalizeE164("+1 (555) 123-4567");
  });

  bench("with whatsapp prefix", () => {
    normalizeE164("whatsapp:+4915112345678");
  });

  bench("plain digits", () => {
    normalizeE164("4915112345678");
  });
});

describe("toWhatsappJid", () => {
  bench("from phone number", () => {
    toWhatsappJid("+1234567890");
  });

  bench("from whatsapp prefixed number", () => {
    toWhatsappJid("whatsapp:+1234567890");
  });

  bench("already a JID", () => {
    toWhatsappJid("1234567890@s.whatsapp.net");
  });
});

describe("jidToE164", () => {
  bench("standard JID", () => {
    jidToE164("1234567890@s.whatsapp.net");
  });

  bench("JID with device suffix", () => {
    jidToE164("1234567890:1@s.whatsapp.net");
  });

  bench("non-matching JID", () => {
    jidToE164("invalid@group.net");
  });
});

describe("sliceUtf16Safe", () => {
  const ascii = "Hello, World! This is a test string for benchmarking purposes.";
  const emoji = "Hello 👋 World 🌍 Test 🚀 String 💻 Benchmark 📊";

  bench("ascii string", () => {
    sliceUtf16Safe(ascii, 5, 30);
  });

  bench("string with emoji surrogate pairs", () => {
    sliceUtf16Safe(emoji, 5, 30);
  });
});

describe("truncateUtf16Safe", () => {
  const emoji = "Hello 👋 World 🌍 Test 🚀 String 💻 Benchmark 📊";

  bench("truncate emoji string", () => {
    truncateUtf16Safe(emoji, 20);
  });
});

describe("safeParseJson", () => {
  const validJson = '{"name":"openclaw","version":"1.0.0","features":["chat","voice","canvas"]}';
  const invalidJson = "{invalid json content}";

  bench("valid JSON", () => {
    safeParseJson(validJson);
  });

  bench("invalid JSON", () => {
    safeParseJson(invalidJson);
  });
});

describe("escapeRegExp", () => {
  bench("string with special chars", () => {
    escapeRegExp("hello.world*test+foo?bar[baz]");
  });

  bench("plain string", () => {
    escapeRegExp("hello world test");
  });
});

describe("clampNumber", () => {
  bench("value within range", () => {
    clampNumber(50, 0, 100);
  });

  bench("value below range", () => {
    clampNumber(-10, 0, 100);
  });

  bench("value above range", () => {
    clampNumber(150, 0, 100);
  });
});
