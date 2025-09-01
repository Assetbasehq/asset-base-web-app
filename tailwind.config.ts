import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        geist: ["'Geist Sans'", "sans-serif"],
        geistMono: ["'Geist Mono'", "monospace"],
        neue: ["'NeueMontreal'", "sans-serif"],
      },
      fontWeight: {
        extralight: "100",
        light: "300",
        medium: "500",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
    },
  },
  plugins: [],
};

export default config;
