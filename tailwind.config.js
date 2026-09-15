module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        charcoal: 'rgb(var(--charcoal) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        cyan: 'rgb(var(--cyan) / <alpha-value>)',
        cyanBright: 'rgb(var(--cyan-bright) / <alpha-value>)',
        offwhite: 'rgb(var(--offwhite) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.6s ease both',
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
