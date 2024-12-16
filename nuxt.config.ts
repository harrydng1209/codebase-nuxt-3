import dotenv from 'dotenv';
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import components from 'unplugin-vue-components/vite';

dotenv.config();

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  components: {
    dirs: []
  },
  css: ['./src/assets/styles/root/main.scss'],
  devtools: {
    enabled: process.env.VITE_DEVTOOLS === 'true'
  },
  dir: {
    middleware: 'middlewares'
  },
  i18n: {
    vueI18n: './vue-i18n.config.ts'
  },
  imports: {
    dirs: []
  },
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vee-validate/nuxt', '@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  srcDir: 'src/',
  ssr: process.env.VITE_SSR === 'true',
  typescript: {
    typeCheck: true
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/assets/styles/root/variables.scss";
            @import "./src/assets/styles/root/mixins.scss";
          `
        }
      }
    },
    plugins: [
      autoImport({
        dirs: ['composables/**'],
        dts: '@types/auto-imports.d.ts',
        imports: [
          {
            '@/apis': [['default', 'apis']],
            '@/constants': [['default', 'constants']],
            '@/utils': [['default', 'utils']]
          }
        ],
        resolvers: [ElementPlusResolver()],
        vueTemplate: true
      }),
      components({
        dirs: ['components/base/**'],
        dts: '@types/components.d.ts',
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
