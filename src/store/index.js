import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

import moduloUsuario from './usuario'
import moduloImagenes from './imagenes'
import moduloCuentas from './cuentas'

export default new Vuex.Store({
    modules: {
        mUsuario: moduloUsuario,
        mImagenes: moduloImagenes,
        mCuentas: moduloCuentas
    }
})