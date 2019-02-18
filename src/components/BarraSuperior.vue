<template>
    <v-toolbar app color="red" dark dense>
        <v-toolbar-side-icon @click="notificarDrawer"/>
        <v-spacer/>
        <v-toolbar-items>
            <v-tooltip bottom>
                <v-btn @click="ver = !ver" slot="activator" icon>
                    <v-badge v-model="ver" color="white" left overlap class="mt-1" >
                        <span slot="badge" class="black--text">{{nro}}</span>
                        <v-icon medium>notifications</v-icon>
                    </v-badge>
                </v-btn>
                <span>Notificaciones</span>
            </v-tooltip>
        </v-toolbar-items>
        <v-toolbar-title>{{ usuario }}</v-toolbar-title>
        <v-toolbar-items>
            <v-tooltip bottom>
                <v-btn icon @click="cerrarSesion" slot="activator">
                    <v-icon>exit_to_app</v-icon>
                </v-btn>
                <span>Cerrar Sesión</span>
            </v-tooltip>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
import bus from '@/bus'

export default {
    data() {
        return {
            usuario: '',
            nro: 3,
            ver: true
        }
    },
    beforeMount() {
        this.usuario = this.$store.getters.getUsuario.nombre +' '+ this.$store.getters.getUsuario.apellido
    },
    methods:{
        notificarDrawer(){
            bus.$emit('notificarDrawer')
        },
        cerrarSesion() {
            this.$store.dispatch('cerrarSesion')
            this.$router.replace('/ingreso')
        }
    }
}
</script>

<style>

</style>
