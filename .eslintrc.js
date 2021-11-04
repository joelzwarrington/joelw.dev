/* eslint-env node */
require("@jobber/eslint-config/patch-eslint-plugin-resolution.js");

module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: ["@jobber/eslint-config"],
  settings: {
    "import/resolver": {
      alias: {
        map: [["@/components", "./src/components"]],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
      },
    },
  },
  rules: {
    "import/no-relative-parent-imports": "warn",
    "no-restricted-imports": "warn",
    "import/no-internal-modules": [
      "warn",
      {
        allow: ["@jobber/*", "**@jobber/**", "@/components/**"],
      },
    ],
  },
  overrides: [
    {
      files: ["./src/pages/**/*.tsx"],
      rules: {
        "import/no-default-export": "off",
      },
    },
  ],
};
