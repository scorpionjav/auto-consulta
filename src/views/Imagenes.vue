<template>
    <v-container fluid>
        <h2>Imágenes<span class="ml-2 caption">Mantenedor</span></h2>
        <v-divider/>
        <tabla-base nroFiltros="3">
            <template #filtro-1>
                <h4 class="mr-3">Buscar</h4>
                <v-text-field
                    v-model="bCodigo"
                    prepend-inner-icon="search"
                    label="ingrese código"
                    single-line
                    hide-details
                    class="mt-0 pt-0"
                    clearable
                    @input="buscar"
                ></v-text-field>
            </template>
            <template #filtro-2>
                <v-text-field
                    v-model="bNombre"
                    prepend-inner-icon="search"
                    label="ingrese nombre corto"
                    single-line
                    hide-details
                    class="mt-0 pt-0"
                    clearable
                    @input="buscar"
                ></v-text-field>
            </template>
            <template #filtro-3>
                <v-btn color="success" @click="modalNueva = true">Nueva Imagen</v-btn>
            </template>
            <template #tabla>
                <v-data-table
                    :headers="encabezado"
                    :items="imagenes"
                    item-key="item.id"
                    :loading="cargando"
                    :pagination.sync="paginacion"
                    :total-items="paginacion.totalItems"
                    :rows-per-page-items="paginacion.rowsPerPageItems"
                    rows-per-page-text="Registros por página"
                    >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.codigo }}</td>
                        <td>{{ props.item.nombre }}</td>
                        <td>{{ props.item.nombreArchivo }}</td>
                        <td>{{ props.item.fecha }}</td>
                        <td class="text-xs-center">
                            <v-avatar size="100px">
                                <v-img :src="props.item.imagen" contain></v-img>
                            </v-avatar>
                        </td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="error" icon="warning">
                        Búsqueda "{{ busqueda }}" no obtuvo resultados.
                    </v-alert>
                    <template slot="pageText" slot-scope="props">
                        Mostrando registros del {{ props.pageStart }} al {{ props.pageStop }} de un total de {{ props.itemsLength }} registros
                    </template>
                    <template slot="no-data">
                        <v-alert :value="true" color="error" icon="warning">
                            No hay usuarios registrados.
                        </v-alert>
                    </template>
                </v-data-table>
                <div class="text-xs-center pt-2">
                    <v-pagination
                        v-model="paginacion.page"
                        :length="paginas"
                        total-visible="5"
                        circle
                    ></v-pagination>
                </div>
            </template>
        </tabla-base>
        <formulario-modal
            titulo="Nueva"
            :modal.sync="modalNueva"
            btnText="Guardar"
            @btnAccion="guardar"
            :exito.sync="gExito"
            :error.sync="gError"
            :msgError.sync="gErrorMsg"
            >
            <template #inputs>
                <v-flex xs12 md6>
                    <v-text-field
                        v-model="nombreCorto"
                        label="Nombre Corto"
                        clearable
                        :disabled="guardando"
                        required
                        :rules="reglasNombre"
                    ></v-text-field>
                </v-flex>
                <v-text-field
                    label="Seleccione Imagen"
                    @click="buscarArchivo"
                    v-model="nombreArchivo"
                    prepend-inner-icon="attach_file"
                    clearable
                    @click:prepend-inner="buscarArchivo"
                    @click:clear="buscarArchivo"
                    :disabled="guardando"
                    required
                    readonly
                    :rules="reglasImagen"
                ></v-text-field>
                <input
                    ref="inputArchivo"
                    type="file"
                    v-show="false"
                    accept="image/*"
                    @change="seleccionarArchivo"
                >
                <v-flex class="text-xs-center">
                    <img :src="urlArchivo" height="250" v-if="urlArchivo"/>
                </v-flex>
            </template>
        </formulario-modal>
    </v-container>
</template>

<script>
//import TablaBase from '@/components/TablaBase.vue'
const TablaBase = () => import('@/components/TablaBase.vue')
// import FormularioModal from '@/components/FormularioModal.vue'
const FormularioModal = () => import('@/components/FormularioModal.vue')
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        TablaBase,
        FormularioModal
    },
    props: ['guardando'],
    data() {
        return {
            cargando: false,
            selected: [],
            busqueda: '',
            bNombre: '',
            bCodigo: '',
            encabezado: [
                {
                    text: 'Código',
                    value:'codigo'
                },
                {
                    text: "Nombre Corto",
                    value: "nombre"
                },
                {
                    text: "Nombre Archivo",
                    value: "nombreArchivo"
                },
                {
                    text: "Fecha",
                    value: "fecha"
                },
                {
                    text: "Imagen",
                    value: "imagen",
                    sortable: false
                }
            ],
            nombreCorto: '',
            nombreArchivo: '',
            urlArchivo: '',
            archivoImagen: '',
            reglasNombre: [
                nc => (nc !='' && nc != null) || 'ingrese un nombre'
            ],
            reglasImagen: [
                na => (na !='' && na != null) || 'seleccione una imagen'
            ],
            modalNueva: false,
            gError: false,
            gErrorMsg: '',
            gExito: false,
        }
    },
    beforeMount() {
        this.getDatosTabla()
    },
    methods: {
        getDatosTabla() {
            this.cargando = true
            this.$store.dispatch('mImagenes/consultarImagenes', this.busqueda)
                .then(() => this.cargando = false)
                .catch((error) => console.log(error))
        },
        buscar() {
            let bc = this.bCodigo != null ? this.bCodigo.trim().toLowerCase() : '',
                bn = this.bNombre != null ? this.bNombre.trim().toLowerCase() : ''
            this.busqueda = { codigo:  bc, nombre: bn }
        },
        buscarArchivo() {
            this.$refs.inputArchivo.click()
        },
        seleccionarArchivo (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.nombreArchivo = files[0].name
				if(this.nombreArchivo.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.urlArchivo = fr.result
                    this.archivoImagen = files[0] // lo que se envia al sevidor
				})
			} else {
				this.nombreArchivo = ''
				this.archivoImagen = ''
				this.urlArchivo = ''
			}
        },
        guardar() {
            this.$store.dispatch('mImagenes/guardarImagen',{
                nombre: this.nombreCorto,
                nombreArchivo: this.nombreArchivo,
                imagen: this.archivoImagen
            }).then(() => {
                this.gExito = true
            }).catch((error) => {
                this.gError = true
                this.gErrorMsg = error
            })
        },
    },
    computed: {
        ...mapGetters('mImagenes', {
            getPaginacion: 'getPaginacion',
            imagenes: 'getImagenes'
        }),
        ...mapActions('mImagenes', [
            'consultarImagenes',
        ]),
        paginacion: {
            set(value) {this.$store.commit('mImagenes/setPaginacion', value)},
            get() {return this.getPaginacion }
        },
        paginas() {
            if (this.paginacion.rowsPerPage == null || this.paginacion.totalItems == null)
                return 0
            return Math.ceil(this.paginacion.totalItems / this.paginacion.rowsPerPage)
        },
        parametros() {
            return {
                ...this.paginacion,
                query: this.busqueda
            };
        }
    },
    watch: {
        parametros: {
            handler() {
                this.getDatosTabla()
            },
            deep: true
        },
        modalNueva(val) {
            if(!val) {
                this.urlArchivo = ''
                this.archivoImagen = ''
            }
        }
    }
}


</script>

<style>

</style>