import autoImport from 'unplugin-auto-import/vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineNuxtConfig({
  ssr: process.env.VITE_SSR === 'true',
  css: ['./assets/styles/root/main.scss'],
  compatibilityDate: '2024-04-03',
  devtools: { enabled: process.env.VITE_DEVTOOLS === 'true' },
  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  components: {
    dirs: ['components/base']
  },
  imports: {
    dirs: []
  },
  i18n: {
    vueI18n: './vue-i18n.config.ts'
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  vite: {
    plugins: [
      autoImport({
        vueTemplate: true,
        dirs: ['composables/**'],
        dts: '@types/auto-imports.d.ts',
        imports: [
          {
            '@/constants': [['default', 'constants']],
            '@/utils': [['default', 'utils']],
            '@/apis': [['default', 'apis']],
            'string-template': [['default', 'stringFormat']]
          }
        ]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./assets/styles/root/variables.scss";
            @import "./assets/styles/root/mixins.scss";
          `
        }
      }
    }
  }
});
