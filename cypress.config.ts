import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
