import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  e2e: {
    setupNodeEvents(on) {
      on("after:run", () => {
        void fetch("http://localhost:3000/api/delete-user");
      });
    },
    baseUrl: "http://localhost:3000",
  },
});
