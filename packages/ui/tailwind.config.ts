import defaultTheme from "config/theme";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./atoms/**/*.{ts,tsx}",
    "./molecules/**/*.{ts,tsx}",
    "./organisms/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      ...defaultTheme,
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
};
export default config;
