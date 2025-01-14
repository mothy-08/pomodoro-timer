import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "bg-btn": "var(--background-button)",
        "clr-btn": "var(--foreground-button)",
        "bg-btn-hover": "var(--background-button-hover)",
        "clr-btn-hover": "var(--foreground-button-hover)",
      },
    },
  },
  plugins: [],
} satisfies Config;
