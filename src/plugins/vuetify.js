// import '@mdi/font/css/materialdesignicons.css' // TODO: para Vuetify 2
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
// import 'vuetify/dist/vuetify.min.css' // TODO: para Vuetify 2
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  // iconfont: 'mdi', // TODO: para Vuetify 2
  iconfont: 'md',
  theme: {
    primary: colors.red,
  }
})