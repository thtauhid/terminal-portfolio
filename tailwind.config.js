import { createThemes } from "tw-colors";

/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      ubuntu: {
        bgcol: "#300a24",
        shebang: "rgb(22, 101, 52)",
        symbol: "rgb(29, 78, 216)",
        command: "rgb(255,255,255)",
      },
      matrix: {
        bgcol: "#000",
        shebang: "rgb(13, 238, 22)",
        symbol: "rgb(13, 238, 22)",
        command: "rgb(255,255,255)",
      },
      arch: {
        bgCol: "rgb(51,51,51)",
        shebang: "rgb(29, 78, 216, 1)",
        symbol: "rgb(13, 238, 22, 1)",
        command: "rgb(255,255,255)",
      },
    }),
  ],
};
