import axios from '@/vue-axios'

const store = {
    state : {
        usuario: null,
        menu: []
    },
    getters: {
        getUsuario(state){
            return state.usuario
        },
        getMenu(state) {
            return state.menu
        }
    },
    mutations: {
        setUsuario(state, usuario) {
            state.usuario = usuario
        },
        setMenu(state, menu) {
            state.menu = menu
        }
    },
    actions: {
        iniciarSesion({commit}, credenciales) {
            return new Promise((resolve, reject) => {
                axios.get('usuario', {
                    params: { rut: credenciales.rut }
                }).then(response => {
                    if(response.data[0].contrasenna === credenciales.contrasenna) {
                        sessionStorage.setItem('usuario', JSON.stringify(response.data[0]))
                        commit('setUsuario', response.data[0])
                        resolve(response.data[0])
                    }
                    else
                        reject(true)
                }).catch(error => {
	                reject(error)
                })
	        })
        },
        cerrarSesion({commit}){
            commit('setUsuario', null)
            sessionStorage.removeItem('usuario')
        },
        cargarMenu(context) {
            return new Promise((resolve, reject) => {
                axios.get('menu')
                    .then(rMenu => {
                        axios.get('menu_rol', {
                            params: { id: context.getters.getUsuario.rol }
                        })
                        .then(rTipo => {
                            const original = rMenu.data.slice()
                            const rol = rTipo.data[0].menu.slice()
                            let menu = original
                            original.map((o, index) => {
                                let a = rol.find(t => t.id == o.id)
                                if (a == undefined) {
                                    menu.splice(index,1)
                                } else {
                                    const subm = o.submenu.slice()
                                    subm.map(s => {
                                        let b = a.submenu.find(t => t == s.id)
                                        if (b == undefined) {
                                            let sm = menu.find(m => m.id == o.id).submenu
                                            let sm2 = sm.find(c => c.id == s.id)
                                            sm.splice(sm.indexOf(sm2),1)
                                        }
                                    })
                                }
                            })
                            context.commit('setMenu', menu)
                            resolve(menu)
                        }).catch((error) => reject(error))
                    }).catch((error) => reject(error))
	        })
        }
    }
}

export default store