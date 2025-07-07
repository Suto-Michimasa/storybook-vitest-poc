import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../packages/*/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../packages/*/src/**/stories.@(js|jsx|mjs|ts|tsx)" // Added to include stories.tsx pattern
  ],
  "addons": [
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-vitest"
  ],
  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },
  "staticDirs": ["../public"]
};
export default config;