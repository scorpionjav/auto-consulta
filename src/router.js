import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import FormularioIngreso from '@/views/FormularioIngreso.vue'
import PanelPrincipal from '@/views/PanelPrincipal.vue'
// General
import Dashboard from '@/views/Dashboard.vue'
// Sistema
import Ticketera from '@/views/Ticketera.vue'
import Imagenes from '@/views/Imagenes.vue'
// Configuación
import CuentasUsuarios from '@/views/CuentasUsuarios.vue'

import Error404 from '@/views/Error404.vue'

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/ingreso',
            component: FormularioIngreso
        },
        {
            path: '/',
            component: PanelPrincipal,
            children: [
                {
                    path: '',
                    component: Dashboard
                },
                {
                    path: 'ticketera',
                    component: Ticketera
                },
                {
                    path: 'campannas',
                    // component:
                },
                {
                    path: 'cobertura',
                    // component:
                }, ,
                {
                    path: 'imagenes',
                    component: Imagenes
                }, ,
                {
                    path: 'cuentas',
                    component: CuentasUsuarios
                }, ,
                {
                    path: 'parametros',
                    // component:
                }
            ]
        },
        {
            path: '*',
            component: Error404,
        }
    ]
})

export default router