import axios from '@/vue-axios'

const store = {
    namespaced: true,
    state: {
        paginacion: {
            descending: false,
            page: 1,
            rowsPerPage: 5,
            sortBy: 'codigo',
            totalItems: 0,
            rowsPerPageItems: [5,10,20,{'text':'Todos','value':-1}]
        },
        imagenes: [],
        temp: []
    },
    getters: {
        getPaginacion(state) {
            return state.paginacion
        },
        getImagenes(state) {
            return state.imagenes
        }
    },
    mutations: {
        setPaginacion(state, payload) {
            state.paginacion = payload
        },
        setImagenes(state, { items, totalItems }) {
            state.imagenes = items
            state.paginacion = { ...state.paginacion, totalItems: totalItems }
        },
        setTemp(state, payload) {
            state.temp = payload
        }
    },
    actions:{
        async getDatosApi({commit}) {
            // OTRA FORMA
            // await axios.get('imagen')
            //         .then(response => {
            //             commit('setTemp', response.data)
            //         }).catch((error) => consolo.log(error))
            try {
                const response = await axios.get('imagen');
                commit('setTemp', response.data)
            } catch (error) {
                console.error(error);
            }
        },
        consultarImagenes(context, busqueda) {
            return new Promise((resolve, reject) => {
                const { sortBy, descending, page, rowsPerPage } = context.state.paginacion
                setTimeout(() => {
                    context.dispatch('getDatosApi').catch(e => reject(e))
                    let items = context.state.temp,
                        codigo = busqueda.codigo,
                        nombre = busqueda.nombre;
                    if (codigo)
                        items = items.filter(i => i.codigo.toLowerCase().includes(codigo));
                    if (nombre)
                        items = items.filter(i => i.nombre.toLowerCase().includes(nombre));
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
                    context.commit('setImagenes', { items, totalItems })
                    resolve()
                }, 1000)
            })
        },
        guardarImagen(context,datos) {
            return new Promise((resolve, reject) => {
                axios.post('imagen', {
                        id: '11', // prueba
                        codigo: 'img11', // prueba
                        nombre: datos.nombre,
                        nombreArchivo: datos.nombreArchivo,
                        fecha: '11/02/2019', // prueba
                        imagen: datos.imagen
                }).then(() => resolve())
                .catch(error => reject(error))
	        })
        }
    }
}
export default store