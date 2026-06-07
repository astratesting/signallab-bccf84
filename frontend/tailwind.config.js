/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink-black': '#0a0a0f',
        'indigo-deep': '#1a1a3e',
        'cyan-bright': '#00f5ff',
        'electric-teal': '#00d4aa',
        'indigo-muted': '#4338ca',
      },
      fontFamily: {
        'space-grotesk': ['var(--font-space-grotesk)', 'sans-serif'],
        'jetbrains-mono': ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'beam-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a3e 50%, #0a0a0f 100%)',
        'dark-radial': 'radial-gradient(circle at 50% 50%, #1a1a3e 0%, #0a0a0f 70%)',
      },
    },
  },
  plugins: [],
}
