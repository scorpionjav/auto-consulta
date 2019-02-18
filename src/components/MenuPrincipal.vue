<template>
    <v-navigation-drawer app v-model="drawer" dark>
        <v-toolbar color="red darken-1" flat dense>
            <v-list class="pt-0" dense>
                <v-list-tile>
                    <v-list-tile-title class="headline text-xs-center">
                        Claro
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-toolbar>
        <v-toolbar class="grey darken-3 pt-2" flat>
                <v-text-field
                    v-model="busqueda"
                    label="buscar"
                    solo-inverted
                    prepend-inner-icon="search"
                    clearable
                ></v-text-field>
        </v-toolbar>
        <v-list
            dense
            class="py-0"
            v-if="!this.busqueda"
        >
            <v-list-tile color="grey" class="grey darken-4 pt-0">
                <v-list-tile-title>GENERAL</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/">
                <v-list-tile-action>
                    <v-icon right>home</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>Inicio</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <!-- Otras opciones del menu -->
        <v-list
            dense
            class="py-0"
            v-for="opcion in filtro"
            :key="opcion.id"
        >
            <v-list-tile color="grey" class="grey darken-4 pt-0">
                <v-list-tile-title>{{ opcion.titulo }}</v-list-tile-title>
            </v-list-tile>
            <v-list-tile
                v-for="sub in opcion.submenu"
                :key="sub.id"
                :to="sub.to"
            >
                <v-list-tile-action>
                    <v-icon right>{{ sub.icono }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                    <v-list-tile-title>{{ sub.nombre }}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <!-- fin -->
        <v-list v-if="this.busqueda && filtro.length == 0">
            <v-alert
                type="error"
                dismissible
                transition="scale-transition"
                value="error"
                @click="limpiar"
                flat
            >
                Búsqueda sin resultados.
            </v-alert>
        </v-list>
    </v-navigation-drawer>
</template>

<script>
import bus from '@/bus'

export default {
    data(){
        return {
            drawer: false,
            busqueda:'',
            menu: []
        }
    },
    beforeMount(){
        bus.$on('notificarDrawer',()=>{
            this.drawer = !this.drawer
        }),
        this.$store.dispatch('cargarMenu')
                .then(response => {
                    this.menu = response
                }).catch(error => {
                    console.log(error)
                })
    },
    methods: {
        limpiar() {
            this.busqueda = ""
        }
    },
    computed: {
        filtro() {
            if(!this.busqueda)
                return this.menu;
            let fs = []
            let f = this.menu.slice().filter(m => {
                let b = this.busqueda.toLowerCase(),
                    sm = m.submenu.filter(s => s.nombre.toLowerCase().includes(b))
                if (sm.length) {
                    fs.push({"id": m.id, "titulo": m.titulo, "submenu": sm})
                    return true
                }
                return (m.titulo.toLowerCase().includes(b))
            })
            return fs.length ? fs : f
        },
    }

}
</script>

<style scope>
.v-input__control {
    min-height: 30px !important
}
</style>
