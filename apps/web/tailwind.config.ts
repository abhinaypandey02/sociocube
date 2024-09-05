import defaultTheme from "config/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.tsx",
    "../../packages/ui/atoms/**/*.tsx",
    "../../packages/ui/molecules/**/*.tsx",
    "../../packages/ui/organisms/**/*.tsx",
  ],
  theme: {
    extend: {
      ...defaultTheme,
    },
  },
};
export default config;
