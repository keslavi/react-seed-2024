

/** @type { import('@storybook/react-vite').StorybookConfig } */
const isChromatic = process.env.CHROMATIC === '1' || process.env.CHROMATIC === 'true';

const config = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    ...(isChromatic ? ["@chromatic-com/storybook"] : []),
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  "framework": "@storybook/react-vite",
  async viteFinal(config) {
    const excluded = [
      'side-channel',
      'side-channel-list',
      'side-channel-map',
      'side-channel-weakmap',
      'es-errors',
      'get-intrinsic',
      'call-bound',
    ];

    config.optimizeDeps = config.optimizeDeps || {};
    config.optimizeDeps.exclude = [
      ...(config.optimizeDeps.exclude || []),
      ...excluded,
    ];

    return config;
  }
};
export default config;