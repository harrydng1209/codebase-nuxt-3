import plugin from 'tailwindcss/plugin';

export default {
  prefix: 'tw-',
  content: [
    './pages/**/*.vue',
    './layouts/**/*.vue',
    './components/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.flex-center': {
          '@apply tw-flex tw-justify-center tw-items-center': {}
        }
      };

      addUtilities(newUtilities);
    })
  ]
};
