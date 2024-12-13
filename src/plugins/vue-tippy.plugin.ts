import vueTippy from 'vue-tippy';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueTippy, {
    directive: 'tippy',
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      placement: 'top',
      allowHTML: true,
      theme: 'material',
      duration: [200, 200]
    }
  });
});
