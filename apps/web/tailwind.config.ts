import defaultTheme from "config/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.tsx",
    "./components/**/*.tsx",
    "../../packages/ui/{atoms,molecules,organisms}/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      ...defaultTheme,
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        madina: ["var(--font-madina)"],
      },
    },
  },
};
export default config;
