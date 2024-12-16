import vueTippy from 'vue-tippy';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(vueTippy, {
    component: 'tippy',
    componentSingleton: 'tippy-singleton',
    defaultProps: {
      allowHTML: true,
      duration: [200, 200],
      placement: 'top',
      theme: 'material'
    },
    directive: 'tippy'
  });
});
