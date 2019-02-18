import axios from '@/vue-axios'

const store = {
    namespaced: true,
    state: {
        paginacion: {
            descending: false,
            page: 1,
            rowsPerPage: 5,
            sortBy: 'id',
            totalItems: 0,
            rowsPerPageItems: [5,10,20,{'text':'Todos','value':-1}]
        },
        cuentas: [],
        temp: [],
        perfiles: [],
        formularios: [],
    },
    getters: {
        getPaginacion(state) {
            return state.paginacion
        },
        getCuentas(state){
            return state.cuentas
        },
        getPerfiles(state) {
            return state.perfiles
        },
        getFormularios(state) {
            return state.formularios
        }
    },
    mutations: {
        setPaginacion(state, payload) {
            state.paginacion = payload
        },
        setCuentas(state, { items, totalItems }) {
            state.cuentas = items
            state.paginacion = { ...state.paginacion, totalItems: totalItems }
        },
        setTemp(state, response) {
            state.temp = response
        },
        setPerfiles(state, payload) {
            state.perfiles = payload
        },
        setFormularios(state, payload) {
            state.formularios = payload
        },
    },
    actions:{
        async getDatosApi({commit}) {
            try {
                const response = await axios.get('cuenta')
                commit('setTemp', response.data)
            } catch (error) {
                console.error(error);
            }
        },
        consultarCuentas(context, busqueda) {
            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = context.getters.getPaginacion
                setTimeout(() => {
                    context.dispatch('getDatosApi').catch(e => reject(e))
                    let items = context.state.temp,
                        e = busqueda.estado,
                        rt = busqueda.rutNombre;
                    if (e)
                        items = items.filter(i => i.estado.toLowerCase() == e);
                    if (rt)
                        items = items.filter(i => i.rut.toLowerCase().includes(rt) || i.nombres.toLowerCase().includes(rt));
                    const totalItems = items.length
                    if (sortBy) {
                        items = items.sort((a, b) => {
                            const sortA = a[sortBy],
                                sortB = b[sortBy];
                            if (descending) {
                                return (sortA < sortB) ? 1
                                : (sortA > sortB) ? -1
                                : 0
                            } else {
                                return (sortA < sortB) ? -1
                                : (sortA > sortB) ? 1
                                : 0
                            }
                        })
                    }
                    if (rowsPerPage > 0)
                        items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
                    resolve(items, totalItems)
                    context.commit('setCuentas', { items, totalItems })
                }, 1000)
            })
        },
        async cargarFormularios({commit}) {
            try {
                const response = await axios.get('formulario')
                commit('setFormularios', response.data)
            } catch (error) {
                console.error(error);
            }
        },
        async cargarPerfiles({commit}) {
            try {
                const response = await axios.get('perfil')
                commit('setPerfiles', response.data)
            } catch (error) {
                console.error(error);
            }
        },
        guardarCuenta(context, datos) {
            return new Promise((resolve, reject) => {
                axios.put('cuenta/'+datos.id, {
                        rut: datos.rut,
                        nombres: datos.nombres,
                        apellidos: datos.apellidos,
                        perfil: datos.perfil,
                        correo: datos.correo,
                        telefono: datos.telefono,
                        autentificacion: datos.autentificacion,
                        sucursal: datos.sucursal,
                        direccion: datos.direccion,
                        estado: datos.estado,
                        formularios: datos.formularios
                }).then(() => {
                    resolve()
                })
                .catch(error => reject(error))
	        })
        }
    }
}

export default store