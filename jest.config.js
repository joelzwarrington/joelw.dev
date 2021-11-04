module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  moduleNameMapper: {
    "\\.css$": "identity-obj-proxy",
    "^@/components(.*)$": "<rootDir>/src/components$1",
  },
  setupFilesAfterEnv: ["./jestConfig.js"],

  testPathIgnorePatterns: ["/node_modules/"],
  coveragePathIgnorePatterns: [],
};
