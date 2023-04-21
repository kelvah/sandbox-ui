import { StorybookConfig } from "@storybook/react-webpack5";

const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.stories.mdx",
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  webpackFinal: async (config) => {
    config!.resolve!.plugins = [
      ...(config?.resolve?.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config?.resolve?.extensions,
      }),
    ];
    config?.plugins?.push(
      new MonacoWebpackPlugin({
        languages: ["yaml"],
        customLanguages: [
          {
            label: "yaml",
            entry: "monaco-yaml",
            worker: {
              id: "monaco-yaml/yamlWorker",
              entry: "monaco-yaml/yaml.worker",
            },
          },
        ],
      })
    );
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  docs: {
    autodocs: true,
  },
};

export default config;
