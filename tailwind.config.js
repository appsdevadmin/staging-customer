// tailwind.config.js
module.exports = {
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js'
    ]
  },
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xl-max': { max: '1535px' },
        // => @media (max-width: 1535px) { ... }

        'xl-max': { max: '1279px' },
        // => @media (max-width: 1279px) { ... }

        'lg-max': { max: '1023px' },
        // => @media (max-width: 1023px) { ... }

        'md-max': { max: '767px' },
        // => @media (max-width: 767px) { ... }

        'sm-max': { max: '639px' },
        // => @media (max-width: 639px) { ... }

        'sm-min': { max: '350px' }
        // => @media (max-width: 350px) { ... }
      }
    }
  },
  variants: {
    extend: {
      display: ['group-hover']
    }
  },
  corePlugins: {
    // ...
    container: false
  }
  // plugins: [require('daisyui'), require('tailwind-bootstrap-grid')()]
}
