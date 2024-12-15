import plugin from 'tailwindcss/plugin';

export default {
  prefix: 'tw-',
  content: ['./src/**/*.vue'],
  theme: {
    extend: {}
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.flex-center': {
          '@apply tw-flex tw-justify-center tw-items-center': {}
        },
        '.fixed-center': {
          '@apply tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw-translate-x-[-50%] tw-translate-y-[-50%]':
            {}
        }
      };

      addUtilities(newUtilities);
    })
  ]
};
