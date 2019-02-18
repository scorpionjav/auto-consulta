<template>
    <v-container fluid>
        <h2>Cuentas de Usuarios<span class="ml-2 caption">Mantenedor</span></h2>
        <v-divider/>
        <tabla-base nroFiltros="2">
            <template slot="filtro-1">
                <h4 class="mr-3">Buscar</h4>
                <v-text-field
                    v-model="bRutNombre"
                    prepend-inner-icon="search"
                    label="ingrese rut ó nombre"
                    single-line
                    hide-details
                    class="mt-0 pt-0"
                    @input="buscar"
                    clearable
                ></v-text-field>
            </template>
            <template slot="filtro-2">
                <h4 class="mr-3">Estado</h4>
                <v-select
                    v-model="bEstado"
                    :items="estados"
                    solo
                    hide-details
                    @change="buscar"
                ></v-select>
            </template>
            <template slot="tabla">
                <v-data-table
                    :headers="encabezado"
                    :items="cuentas"
                    :pagination.sync="paginacion"
                    :total-items="paginacion.totalItems"
                    :loading="cargando"
                    :rows-per-page-items="paginacion.rowsPerPageItems"
                    rows-per-page-text="Registros por página"
                    item-key="item.id"
                >
                    <template slot="items" slot-scope="props">
                        <td>{{ props.item.rut }}</td>
                        <td>{{ props.item.nombres }}</td>
                        <td>{{ props.item.apellidos }}</td>
                        <td>{{ nombrePerfil(props.item.perfil) }}</td>
                        <td>{{ props.item.correo }}</td>
                        <td>{{ props.item.telefono }}</td>
                        <td>{{ props.item.autentificacion }}</td>
                        <td>{{ props.item.estado }}</td>
                        <td class="justify-center layout">
                            <v-btn
                                icon
                                class="mx-0"
                                :ripple="{class: 'red--text'}"
                                @click="modificar(props.item)"
                                >
                                <v-icon small color="blue">edit</v-icon>
                            </v-btn>
                            <v-btn
                                v-if="props.item.estado.toLowerCase() != 'inactiva'"
                                icon
                                class="mx-0"
                                :ripple="{class: 'red--text'}"
                                @click="eliminar(props.item)"
                                >
                                <v-icon small color="red">delete</v-icon>
                            </v-btn>
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
            titulo="Modificar"
            :modal.sync="modalEditar"
            btnText="Guardar"
            @btnAccion="guardar"
            :exito.sync="gExito"
            :error.sync="gError"
            :msgError.sync="gErrorMsg"
            >
            <template #inputs>
                <h3>Datos de Usuario</h3>
                <v-container fluid grid-list-md pa-0>
                    <v-layout row wrap>
                        <v-flex xs12 order-sm1>
                            <v-text-field
                                v-model="cSeleccionada.rut"
                                label="RUT"
                                readonly
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm2>
                            <v-select
                                label="Perfil de Usuario"
                                v-model="cSeleccionada.perfil"
                                :items="perfiles"
                                item-text="nombre"
                                item-value="id"
                            ></v-select>
                        </v-flex>
                        <v-flex xs12 sm6 order-xs10 order-sm3>
                            <p class="mb-0">Estado de Cuenta</p>
                            <v-switch
                                :label="cSeleccionada.estado"
                                v-model="cSeleccionada.estado"
                                color="primary"
                                class="mt-0 pt-0"
                                true-value="Activa"
                                false-value="Inactiva"
                                hide-details
                            >
                            </v-switch>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm4>
                            <v-text-field v-model="cSeleccionada.nombres" label="Nombres"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm5>
                            <v-text-field v-model="cSeleccionada.apellidos" label="Apellidos"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm6>
                            <v-text-field v-model="cSeleccionada.correo" label="Correo Electrónico"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm7>
                            <v-text-field v-model="cSeleccionada.telefono" label="Número de Contacto"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm8>
                            <v-text-field v-model="cSeleccionada.sucursal" label="Sucursal ó Área"></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 order-sm9>
                            <v-text-field v-model="cSeleccionada.direccion" label="Dirección Sucursal"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
                <h3>Formularios</h3>
                <v-layout row wrap>
                    <v-flex
                        xs12
                        sm6
                        v-for="f in formularios"
                        :key="f.id"
                        >
                        <v-checkbox
                            v-model="cSeleccionada.formularios"
                            :label="f.nombre"
                            :value="f.id"
                            color="primary"
                            class="ma-0"
                            hide-details
                        ></v-checkbox>
                    </v-flex>
                </v-layout>
            </template>
        </formulario-modal>
        <formulario-modal
            titulo="Eliminar"
            :modal.sync="modalEliminar"
            btnText="Confirmar"
            @btnAccion="confirmar"
            :exito.sync="gExito"
            :error.sync="gError"
            :msgError.sync="gErrorMsg"
            >
            <template #inputs>
                <v-container fluid grid-list-md pa-0>
                    <v-flex xs12 class="text-xs-center title">
                        ¿Seguro que desea eliminar?
                    </v-flex>
                    <v-layout row wrap mt-1 class="subheading">
                        <v-flex xs12 class="text-xs-center font-weight-bold">
                            Cuenta de Usuario
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-right font-weight-bold">
                            RUT:
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-left">
                            {{ cSeleccionada.rut}}
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-right font-weight-bold">
                            Nombres:
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-left">
                            {{ cSeleccionada.nombres}}
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-right font-weight-bold">
                            Apellidos:
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-left">
                            {{ cSeleccionada.apellidos}}
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-right font-weight-bold">
                            Perfil:
                        </v-flex>
                        <v-flex xs12 md6 class="text-xs-left">
                            {{ nombrePerfil(cSeleccionada.perfil) }}
                        </v-flex>
                    </v-layout>
                </v-container>
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
    components:{
        TablaBase,
        FormularioModal
    },
    props: ['guardando'],
    data () {
        return {
            cargando: true,
            // selected: [],
            busqueda: '',
            estados:['Todas', 'Activa', 'Inactiva'],
            bEstado: 'Todas',
            bRutNombre: '',
            encabezado: [
                {
                    text: "RUT",
                    value: "rut"
                },
                {
                    text: "Nombres",
                    value: "nombres"
                },
                {
                    text: "Apellidos",
                    value: "apellidos"
                },
                {
                    text: "Perfil",
                    value: "perfil"
                },
                {
                    text: "Correo Electrónico",
                    value: "correo"
                },
                {
                    text: "Número de Contacto",
                    value: "telefono"
                },
                {
                    text: "Tipo de Autentificación",
                    value: "autentificacion"
                },
                {
                    text: "Estado",
                    value: "estado"
                },
                {
                    text: "Acciones",
                    sortable: false
                }
            ],
            cSeleccionada: {},
            modalEditar: false,
            gError: false,
            gErrorMsg: '',
            gExito: false,
            modalEliminar: false
        }
    },
    beforeMounted() {
        this.getDatosTabla()
    },
    methods: {
        getDatosTabla() {
            this.cargarPerfiles
            this.cargarFormularios
            this.cargando = true
            //this.consultarCuentas
            this.$store.dispatch('mCuentas/consultarCuentas', this.busqueda)
                .then(() => this.cargando = false)
                .catch((error) => console.log(error))
        },
        buscar() {
            let be = (this.bEstado != 'Todas') ? this.bEstado.toLowerCase() : '',
                brn = (this.bRutNombre != null) ? this.bRutNombre.toLowerCase() : '';
            this.busqueda = { estado:  be, rutNombre: brn }
        },
        nombrePerfil(id) {
            let n = this.perfiles.find(p => p.id == id)
            if (n) return n.nombre
        },
        modificar(cuenta) {
            this.cSeleccionada = cuenta
            this.modalEditar = true
        },
        guardar() {
            this.$store.dispatch('mCuentas/guardarCuenta', this.cSeleccionada)
                .then(() => {
                    this.gExito = true
                }).catch((error) => {
                    this.gError = true
                    this.gErrorMsg = error
                })
        },
        eliminar(cuenta) {
            this.cSeleccionada = cuenta
            this.modalEliminar =  true
        },
        confirmar() {
            this.cSeleccionada.estado = 'Inactiva'
            this.guardar()
        }
    },
    computed: {
        ...mapGetters('mCuentas', {
            cuentas: 'getCuentas',
            perfiles: 'getPerfiles',
            formularios: 'getFormularios',
            getPaginacion: 'getPaginacion'
        }),
        ...mapActions('mCuentas', [
            'cargarPerfiles',
            'cargarFormularios',
        ]),
        paginacion: {
            set(value) {this.$store.commit('mCuentas/setPaginacion', value)},
            get() {return this.getPaginacion }
        },
        paginas () {
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
        modalEditar(val) {
            if(!val) {
                // limpiar textfields
                // inicializa todo
            }
        },
    },

}
</script>

<style>

</style>