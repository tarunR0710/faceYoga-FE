import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Themeable role tokens ──────────────────────────────────────────
        // All colours reference CSS variables set per-palette in globals.css.
        // To try a palette: change `data-palette` on <html> in app/layout.tsx.
        // To tweak a palette: edit its --c-* channels in globals.css. One place.
        background: 'rgb(var(--c-bg) / <alpha-value>)',
        foreground: 'rgb(var(--c-ink) / <alpha-value>)',

        primary: { DEFAULT: 'rgb(var(--c-primary) / <alpha-value>)', foreground: 'rgb(var(--c-primary-ink) / <alpha-value>)' },
        secondary: { DEFAULT: 'rgb(var(--c-surface-2) / <alpha-value>)', foreground: 'rgb(var(--c-ink) / <alpha-value>)' },
        muted: { DEFAULT: 'rgb(var(--c-surface-2) / <alpha-value>)', foreground: 'rgb(var(--c-muted) / <alpha-value>)' },
        accent: { DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)', foreground: 'rgb(var(--c-accent-ink) / <alpha-value>)' },
        card: { DEFAULT: 'rgb(var(--c-surface) / <alpha-value>)', foreground: 'rgb(var(--c-ink) / <alpha-value>)' },

        border: 'rgb(var(--c-border) / <alpha-value>)',
        'border-soft': 'rgb(var(--c-border-soft) / <alpha-value>)',
        input: 'rgb(var(--c-border) / <alpha-value>)',
        ring: 'rgb(var(--c-accent) / <alpha-value>)',
        destructive: { DEFAULT: '#c0492f', foreground: '#f7f4ef' },
        success: { DEFAULT: 'rgb(var(--c-accent) / <alpha-value>)', foreground: 'rgb(var(--c-accent-ink) / <alpha-value>)' },
        navy: { DEFAULT: 'rgb(var(--c-ink) / <alpha-value>)', foreground: 'rgb(var(--c-primary-ink) / <alpha-value>)' },

        // Semantic aliases (use these in new components)
        bg: 'rgb(var(--c-bg) / <alpha-value>)',
        surface: 'rgb(var(--c-surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--c-surface-2) / <alpha-value>)',
        // accent-2 is THE SPARK (Fig) — enumeration and emphasis only, never
        // an action. See the note in globals.css above the mineral palette.
        'accent-2': 'rgb(var(--c-accent-2) / <alpha-value>)',
        'accent-2-soft': 'rgb(var(--c-accent-2-soft) / <alpha-value>)',
        'accent-soft': 'rgb(var(--c-accent-soft) / <alpha-value>)',

        // Descriptive names kept so existing components re-theme automatically:
        //   ivory=bg · ink=text/dark · teal=accent · analysis-teal=muted · mist/sand=soft surface · taupe=accent-2
        ivory: 'rgb(var(--c-bg) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        teal: 'rgb(var(--c-accent) / <alpha-value>)',
        'analysis-teal': 'rgb(var(--c-muted) / <alpha-value>)',
        mist: 'rgb(var(--c-surface-2) / <alpha-value>)',
        taupe: 'rgb(var(--c-accent-2) / <alpha-value>)',
        sand: 'rgb(var(--c-surface-2) / <alpha-value>)',
        white: '#ffffff',
      },

      fontFamily: {
        sans: [
          'var(--font-manrope)',
          'Manrope',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: [
          'var(--font-newsreader)',
          'Georgia',
          'serif',
        ],
        display: [
          'var(--font-manrope)',
          'Manrope',
          '-apple-system',
          'sans-serif',
        ],
        // The system voice — section tags, indices, the session timer. Without
        // this key `font-mono` fell through to Tailwind's default OS stack, so
        // the timer rendered SF Mono on Mac and Consolas on Windows.
        mono: [
          'var(--font-plex-mono)',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'monospace',
        ],
      },

      fontSize: {
        // QOVES typography scale
        'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'heading-1': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-2': ['2rem', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        'heading-3': ['1.5rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },

      spacing: {
        // Section spacing
        'section': '6rem',
        'section-lg': '8rem',
        'section-xl': '10rem',
      },

      maxWidth: {
        'container': '1280px',
        'container-lg': '1400px',
        'prose': '720px',
      },

      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
        'full': '9999px',
      },

      boxShadow: {
        'xs': 'var(--shadow-xs)',
        'sm': 'var(--shadow-sm)',
        'DEFAULT': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'card': 'var(--shadow-sm)',
        'card-hover': 'var(--shadow-md)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'slide-in-left': {
          from: { transform: 'translateX(-100%)' },
          to: { transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-down': 'fade-in-down 0.6s ease-out',
        'slide-in-right': 'slide-in-right 0.4s ease-out',
        'slide-in-left': 'slide-in-left 0.4s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },

      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
        '400': '400ms',
      },

      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}

export default config
