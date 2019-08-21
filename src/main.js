import Vue from 'vue'
import '@/plugins/vuetify'
// import vuetify from '@/plugins/vuetify' // TODO: para Vuetify 2
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import VueGoogleCharts from 'vue-google-charts'

Vue.use(VueGoogleCharts)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  const paginaPublica = ['/ingreso'];
  const reqIngresar = !paginaPublica.includes(to.path);
  const conectado = sessionStorage.getItem('usuario');
  if (conectado) {
    store.commit('setUsuario', JSON.parse(conectado))
  }
  if (reqIngresar && !conectado) {
    return next('/ingreso');
  }
  next();
})

new Vue({
  // vuetify, // TODO: para Vuetify 2
  router,
  store,
  render: h => h(App)
}).$mount('#app')
