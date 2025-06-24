module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react/no-unescaped-entities": "off",
    "react-hooks/exhaustive-deps": "warn",
    "@next/next/no-img-element": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "prettier/prettier": "error"
  },
  parserOptions: {
    project: "./tsconfig.json"
  }
};
