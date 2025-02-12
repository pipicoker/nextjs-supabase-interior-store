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
        blac: '#000000',
  			blac2: '#1E1E1E',
  			graay: '#D0D0D0',
  			pry: '#DC6601',
  			whitee: '#FFFFFF',
      },
      backgroundImage: {
  			'hero-bg': 'url("/Images/hero-bg.jpg")',
  			'summer1-bg': 'url("/Images/summer1.jpg")',
  			'summer2-bg': 'url("/Images/summer2.jpg")'
  		},
    },
  },
  plugins: [],
} satisfies Config;
