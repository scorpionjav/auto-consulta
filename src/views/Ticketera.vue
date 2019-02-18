<template>
    <v-container fluid>
        <h2>Tickets<span class="ml-2 caption">Mantenedor</span></h2>
        <v-divider/>
        <tabla-base nroFiltros="8">
            <template slot="filtro-1">
                <h4 class="mr-3">Ejecutivo</h4>
                <v-text-field
                    v-model="bEjecutivo"
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
                <h4 class="mr-3">Ticket</h4>
                <v-text-field
                    v-model="bTicket"
                    prepend-inner-icon="search"
                    label="ingrese ticket"
                    single-line
                    hide-details
                    class="mt-0 pt-0"
                    @input="buscar"
                    clearable
                ></v-text-field>
            </template>
            <template slot="filtro-3">
                <h4 class="mr-3">Formulario</h4>
                <v-select
                    v-model="bFormulario"
                    :items="formularios"
                    solo
                    hide-details
                    @change="buscar"
                ></v-select>
            </template>
            <template slot="filtro-4">
                <h4 class="mr-3">Fecha de Creación</h4>
                <v-menu
                    ref="menuFC"
                    v-model="menuFC"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="bFechaCreacion"
                        label="ingrese fecha"
                        solo
                        readonly
                        hide-details
                        clearable
                    ></v-text-field>
                    <v-date-picker
                        no-title
                        locale="es-CL"
                    ></v-date-picker>
                </v-menu>
            </template>
            <template slot="filtro-5">
                <h4 class="mr-3">Cliente</h4>
                <v-text-field
                    v-model="bCliente"
                    prepend-inner-icon="search"
                    label="ingrese rut ó nombre"
                    single-line
                    hide-details
                    class="mt-0 pt-0"
                    @input="buscar"
                    clearable
                ></v-text-field>
            </template>
            <template slot="filtro-6">
                <h4 class="mr-3">SLA</h4>
                <v-select
                    v-model="bSla"
                    :items="slas"
                    solo
                    hide-details
                    @change="buscar"
                ></v-select>
            </template>
            <template slot="filtro-7">
                <h4 class="mr-3">Estado</h4>
                <v-select
                    v-model="bEstado"
                    :items="estados"
                    solo
                    hide-details
                    @change="buscar"
                ></v-select>
            </template>
            <template slot="filtro-8">
                <h4 class="mr-3"></h4>
                <v-menu
                    ref="menuFH"
                    v-model="menuFH"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
                    >
                    <v-text-field
                        slot="activator"
                        v-model="bFechaHasta"
                        label="ingrese fecha"
                        solo
                        readonly
                        hide-details
                        clearable
                    ></v-text-field>
                    <v-date-picker
                        no-title
                        locale="es-CL"
                    ></v-date-picker>
                </v-menu>
            </template>
        </tabla-base>
    </v-container>
</template>

<script>
import TablaBase from '@/components/TablaBase2.vue'
import FormularioModal from '@/components/FormularioModal.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components:{
        TablaBase,
        FormularioModal
    },
    props: ['guardando'],
    data() {
        return {
            bEjecutivo: '',
            bCliente: '',
            bTicket: '',
            bSla: 'Todos',
            slas: ['Todos','Revisar'],
            bFormulario: 'Todos',
            formularios: ['Todos','Revisar'],
            bEstado: 'Todas',
            estados:['Todas', 'Abierto'],
            menuFC: false,
            // pickerFC: null, //v-model de picker FC
            bFechaCreacion: null,
            menuFH: false,
            // pickerFH: null, //v-model de picker FH
            bFechaHasta: null,
        }
    },
    methods: {
        buscar() {

        },
        seleccionFC(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            this.bFechaCreacion = `${day}/${month}/${year}`
            this.menuFC = false
        },
        seleccionFH(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            this.bFechaHasta = `${day}/${month}/${year}`
            this.menuFH = false
        },
        formatoFecha(date) {
            if (!date) return null
            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        }

    },
    computed: {

    },
    watch: {
        menuFC(val) {
            if(val) {
                console.log('aqui')
                this.menuFC = false
                return this.bFechaCreacion = this.formatoFecha(date)
            }
        },
        menuFH(val) {
            if(val)
                return this.formatoFecha(this.bFechaHasta)
        }
    },
}
</script>

<style>

</style>
