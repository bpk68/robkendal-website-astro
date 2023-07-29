/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.astro'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: ['Space Grotesk', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        brand: {
          'blue-dark': 'rgb(var(--color-brand-blue-dark) / <alpha-value>)',
          blue: 'rgb(var(--color-brand-blue) / <alpha-value>)',
          'blue-light': 'rgb(var(--color-brand-blue-light) / <alpha-value>)',
          'blue-lighter':
            'rgb(var(--color-brand-blue-lighter) / <alpha-value>)',
          purple: 'rgb(var(--color-brand-purple) / <alpha-value>)',
          red: 'rgb(var(--color-brand-red) / <alpha-value>)',
          cream: 'rgb(var(--color-brand-cream) / <alpha-value>)',
          'cream-light': 'rgb(var(--color-brand-cream-light) / <alpha-value>)',
        },
        primary: {
          blue: 'rgb(var(--color-primary-blue) / <alpha-value>)',
          green: 'rgb(var(--color-primary-green) / <alpha-value>)',
          yellow: 'rgb(var(--color-primary-yellow) / <alpha-value>)',
        },
        text: {
          body: 'rgb(var(--color-text-body) / <alpha-value>)',
          bold: 'rgb(var(--color-text-bold) / <alpha-value>)',
          heading: 'rgb(var(--color-text-heading) / <alpha-value>)',
          muted: 'rgb(var(--color-text-muted) / <alpha-value>)',
          code: 'rgb(var(--color-text-code) / <alpha-value>)',
          link: 'rgb(var(--color-text-link) / <alpha-value>)',
          selection: 'rgb(var(--color-text-selection) / <alpha-value>)',
        },
        bg: {
          body: 'rgb(var(--color-bg-body) / <alpha-value>)',
          code: 'rgb(var(--color-bg-code) / <alpha-value>)',
          selection: 'rgb(var(--color-bg-selection) / <alpha-value>)',
        },
        border: {
          code: 'rgb(var(--color-border-code) / <alpha-value>)',
        },
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            pre: false,
            code: false,
            'pre code': false,
            'code::before': false,
            'code::after': false,
            a: {
              'text-decoration': 'none',
              'background-repeat': 'no-repeat',
              'background-size': '100% 1.5px',
              'background-position': '0 100%',
              'background-image':
                'linear-gradient(to right, rgb(var(--color-text-link)/1), rgb(var(--color-text-link)/1))',
              '&:hover': {
                color: 'rgb(var(--color-text-link))',
              },
            },
            'h1, h2, h3, h4, h5': {
              color: 'rgb(var(--color-text-heading))',
            },
            blockquote: {
              border: 'none',
              position: 'relative',
              width: '96%',
              margin: '0 auto',
              'font-style': 'normal',
              'font-size': '1.0625em',
              'padding-top': '1.5rem',
              'padding-bottom': '0.5rem',
              'padding-left': '1.5rem',
              'padding-right': '1.5rem',
            },
            'blockquote::after': {
              content: '',
            },
            'blockquote p:first-of-type::before': {
              content: '',
            },
            'blockquote p:last-of-type::after': {
              content: '',
            },
          },
        },
        bubblegum: {
          css: {
            '--tw-prose-body': 'rgb(var(--color-text-body))',
            '--tw-prose-headings': 'rgb(var(--color-text-heading))',
            '--tw-prose-lead': 'rgb(var(--color-text-body))',
            '--tw-prose-links': 'rgb(var(--color-text-body))',
            '--tw-prose-bold': 'rgb(var(--color-text-bold))',
            '--tw-prose-counters': 'rgb(var(--color-text-body))',
            '--tw-prose-bullets': 'rgb(var(--color-text-body))',
            '--tw-prose-hr': 'rgb(var(--color-text-muted))',
            '--tw-prose-quotes': 'rgb(var(--color-text-body))',
            '--tw-prose-quote-borders': 'rgb(var(--color-text-muted))',
            '--tw-prose-captions': 'rgb(var(--color-primary-heading))',
            '--tw-prose-quote-captions': 'rgb(var(--color-primary-heading))',
            '--tw-prose-code': 'rgb(var(--color-text-code))',
            '--tw-prose-pre-code': 'rgb(var(--color-text-code))',
            '--tw-prose-pre-bg': 'rgb(var(--color-bg-code))',
            '--tw-prose-th-borders': 'rgb(var(--color-text-muted))',
            '--tw-prose-td-borders': 'rgb(var(--color-text-muted))',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
