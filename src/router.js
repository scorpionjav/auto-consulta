import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/ingreso',
            component: () => import('@/views/FormularioIngreso.vue')
        },
        {
            path: '/',
            component: () => import('@/views/PanelPrincipal.vue'),
            children: [
                {
                    path: '',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: 'ticketera',
                    component: () => import('@/views/Ticketera.vue')
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
                    component: () => import('@/views/Imagenes.vue')
                }, ,
                {
                    path: 'cuentas',
                    component: () => import('@/views/CuentasUsuarios.vue')
                }, ,
                {
                    path: 'parametros',
                    // component:
                }
            ]
        },
        {
            path: '*',
            component: () => import('@/views/Error404.vue'),
        }
    ]
})

export default router