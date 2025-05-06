import vueTippy, { type TippyPluginOptions } from 'vue-tippy';

export default defineNuxtPlugin((nuxtApp) => {
  const options: TippyPluginOptions = {
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      allowHTML: true,
      duration: [200, 200],
      placement: 'top',
      theme: 'material',
    },
    directive: 'tippy',
  };

  nuxtApp.vueApp.use(vueTippy, options);
});
