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
        // QOVES-inspired color palette
        background: '#ffffff',
        foreground: '#0a0a0a',

        // Primary - Dark charcoal/black for buttons
        primary: {
          DEFAULT: '#0a0a0a',
          foreground: '#ffffff',
        },

        // Secondary - Light gray
        secondary: {
          DEFAULT: '#f5f5f5',
          foreground: '#0a0a0a',
        },

        // Muted text colors
        muted: {
          DEFAULT: '#f5f5f5',
          foreground: '#737373',
        },

        // Accent
        accent: {
          DEFAULT: '#f5f5f5',
          foreground: '#0a0a0a',
        },

        // Card backgrounds
        card: {
          DEFAULT: '#ffffff',
          foreground: '#0a0a0a',
        },

        // Border colors
        border: '#e5e5e5',
        input: '#e5e5e5',
        ring: '#0a0a0a',

        // Destructive/Error
        destructive: {
          DEFAULT: '#dc2626',
          foreground: '#ffffff',
        },

        // Success
        success: {
          DEFAULT: '#16a34a',
          foreground: '#ffffff',
        },

        // Near-black. Headings, dark sections, navbar pill.
        ink: '#0a0a0a',

        // `brand` no longer carries a hue — it resolves to near-black via
        // --c-brand. The name is kept so every accent call-site on the page
        // keeps working, but this palette is deliberately achromatic; see the
        // note in globals.css before adding a colour back.
        brand: {
          DEFAULT: 'rgb(var(--c-brand) / <alpha-value>)',
          ink: 'rgb(var(--c-brand-ink) / <alpha-value>)',
          soft: 'rgb(var(--c-brand-soft) / <alpha-value>)',
        },
        'ink-muted': '#666666',
        // Studio backdrop baked into the before/after photos — container fills
        // match it so there's no grey flash before the image paints. This one is
        // NOT a theme colour: it has to keep matching the photographs.
        'photo-bg': '#b2c1c8',
        mist: '#f5f5f5',
        // Every section is #FFFFFF now, so card borders are the only thing
        // describing structure — #ebebeb on white was effectively invisible
        // once the alternating grey grounds went away.
        'border-soft': '#e3e3e3',

        // Navy for footer
        navy: {
          DEFAULT: '#1a1a2e',
          foreground: '#ffffff',
        },
      },

      fontFamily: {
        // var(--font-geist-sans) comes from GeistSans in layout.tsx. Referencing
        // the variable (not a literal family name) is what binds Tailwind to the
        // hashed, self-hosted face Next.js emits.
        sans: [
          'var(--font-geist-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'var(--font-geist-sans)',
          '-apple-system',
          'sans-serif',
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
        'sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'DEFAULT': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'md': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.16)',
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
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
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
}

export default config
