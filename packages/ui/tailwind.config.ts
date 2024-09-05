import defaultTheme from "config/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./**/*.{ts,tsx}"],
  theme: {
    extend: {
      ...defaultTheme,
    },
  },
};
export default config;
