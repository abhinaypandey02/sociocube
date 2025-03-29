import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#5B9364",
        accent: "#6358de",
        dark: "#011627",
        "primary-bg": "#fff",
      },
      borderRadius: {
        primary: "4px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "elevation-1": "0 1px 2px 0 #0000004d, 0 1px 3px 1px #00000026",
        "elevation-2": "0 1px 2px 0 #0000004d, 0 2px 6px 2px #00000026",
        "elevation-3": "0 1px 3px 0 #0000004d, 0 4px 8px 3px #00000026",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
        madina: ["var(--font-madina)"],
      },
    },
  },
};
export default config;
