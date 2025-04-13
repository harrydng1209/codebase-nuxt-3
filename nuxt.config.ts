import autoImports from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';

import { COOKIE_KEYS, LANGUAGE_NAMES } from './src/constants/shared.const';
import { ELanguageCode } from './src/models/enums/shared.enum';

export default defineNuxtConfig({
  compatibilityDate: '2025-01-25',

  components: {
    dirs: [],
  },

  css: ['./src/assets/styles/root/main.scss'],

  devtools: {
    enabled: process.env.VITE_DEVTOOLS === 'true',
  },

  dir: {
    middleware: 'middlewares',
  },

  elementPlus: {
    icon: false,
  },

  i18n: {
    defaultLocale: ELanguageCode.English,
    detectBrowserLanguage: {
      alwaysRedirect: true,
      cookieKey: COOKIE_KEYS.LANGUAGE,
      redirectOn: 'root',
      useCookie: true,
    },
    locales: [
      {
        code: ELanguageCode.English,
        file: 'en.json',
        name: LANGUAGE_NAMES[ELanguageCode.English],
      },
      {
        code: ELanguageCode.Vietnamese,
        file: 'vi.json',
        name: LANGUAGE_NAMES[ELanguageCode.Vietnamese],
      },
      {
        code: ELanguageCode.Japanese,
        file: 'ja.json',
        name: LANGUAGE_NAMES[ELanguageCode.Japanese],
      },
    ],
    strategy: 'prefix',
  },

  imports: {
    dirs: [],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@element-plus/nuxt',
    'nuxt-svgo-loader',
  ],

  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {},
    },
  },

  sourcemap: {
    client: true,
    server: true,
  },

  srcDir: 'src/',
  ssr: process.env.VITE_SSR === 'true',

  typescript: {
    typeCheck: true,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "@/assets/styles/root/variables";
            @import "@/assets/styles/root/mixins";
          `,
        },
      },
    },

    plugins: [
      autoImports({
        dirs: ['apis/**', 'composables/shared/**', 'constants/**', 'utils/**'],
        dts: '@types/auto-imports.d.ts',

        eslintrc: {
          enabled: true,
          filepath: './.globalsrc.json',
          globalsPropValue: true,
        },

        imports: [],
        vueTemplate: true,
      }),

      components({
        dirs: ['components/shared/**'],
        dts: '@types/components.d.ts',
      }),
    ],
  },
});
