import plugin from 'tailwindcss/plugin';

export default {
  content: ['src/**/*.{js,ts,vue}'],

  plugins: [
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        '.fixed-center': {
          '@apply tw-fixed tw-top-1/2 tw-left-1/2 tw-transform tw-translate-x-[-50%] tw-translate-y-[-50%]':
            {},
        },
        '.flex-between': {
          '@apply tw-flex tw-justify-between tw-items-center': {},
        },
        '.flex-center': {
          '@apply tw-flex tw-justify-center tw-items-center': {},
        },
      };
      addUtilities(newUtilities);
    }),
  ],

  prefix: 'tw-',

  theme: {
    extend: {},
  },
};
