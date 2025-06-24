import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: ["../**/*.mdx", "../**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  docs: {
    defaultName: "Documentation",
  },
  typescript: {
    check: true,
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;