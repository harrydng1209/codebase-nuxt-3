import autoImport from 'unplugin-auto-import/vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import dotenv from 'dotenv';

dotenv.config();

export default defineNuxtConfig({
  srcDir: 'src/',
  ssr: process.env.VITE_SSR === 'true',
  compatibilityDate: '2024-04-03',
  css: ['./src/assets/styles/root/main.scss'],
  modules: ['@nuxtjs/i18n', '@pinia/nuxt', '@vee-validate/nuxt', '@nuxtjs/tailwindcss'],
  devtools: {
    enabled: process.env.VITE_DEVTOOLS === 'true'
  },
  dir: {
    middleware: 'middlewares'
  },
  components: {
    dirs: []
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
  typescript: {
    typeCheck: true
  },
  vite: {
    plugins: [
      autoImport({
        vueTemplate: true,
        dirs: ['composables/**'],
        dts: '@types/auto-imports.d.ts',
        resolvers: [ElementPlusResolver()],
        imports: [
          {
            '@/constants': [['default', 'constants']],
            '@/utils': [['default', 'utils']],
            '@/apis': [['default', 'apis']]
          }
        ]
      }),
      components({
        dirs: ['components/base/**'],
        dts: '@types/components.d.ts',
        resolvers: [ElementPlusResolver()]
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @import "./src/assets/styles/root/variables.scss";
            @import "./src/assets/styles/root/mixins.scss";
          `
        }
      }
    }
  }
});
