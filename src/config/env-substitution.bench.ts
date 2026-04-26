import { bench, describe } from "vitest";
import { resolveConfigEnvVars } from "./env-substitution.js";

const mockEnv: NodeJS.ProcessEnv = {
  API_KEY: "sk-test-1234567890abcdef",
  DATABASE_URL: "postgres://user:pass@localhost:5432/db",
  REDIS_URL: "redis://localhost:6379",
  NODE_ENV: "production",
  SECRET_TOKEN: "very-secret-token-value",
};

const simpleConfig = {
  apiKey: "${API_KEY}",
  database: "${DATABASE_URL}",
};

const nestedConfig = {
  providers: {
    primary: {
      apiKey: "${API_KEY}",
      url: "${DATABASE_URL}",
    },
    cache: {
      url: "${REDIS_URL}",
    },
  },
  environment: "${NODE_ENV}",
};

const mixedConfig = {
  plainString: "no substitution needed",
  number: 42,
  boolean: true,
  nullValue: null,
  withSub: "${API_KEY}",
  array: ["${DATABASE_URL}", "static-value", "${REDIS_URL}"],
  nested: {
    deep: {
      value: "${SECRET_TOKEN}",
    },
  },
};

const noSubstitutionConfig = {
  name: "openclaw",
  version: "1.0.0",
  features: ["chat", "voice"],
  settings: {
    timeout: 5000,
    retries: 3,
    debug: false,
  },
};

const escapedConfig = {
  template: "$${API_KEY}",
  mixed: "prefix-${API_KEY}-suffix",
};

describe("resolveConfigEnvVars", () => {
  bench("simple config", () => {
    resolveConfigEnvVars(simpleConfig, mockEnv);
  });

  bench("nested config", () => {
    resolveConfigEnvVars(nestedConfig, mockEnv);
  });

  bench("mixed types config", () => {
    resolveConfigEnvVars(mixedConfig, mockEnv);
  });

  bench("no substitution needed", () => {
    resolveConfigEnvVars(noSubstitutionConfig, mockEnv);
  });

  bench("escaped variables", () => {
    resolveConfigEnvVars(escapedConfig, mockEnv);
  });
});
