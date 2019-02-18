<template>
    <div>
        <barra-superior/>
        <menu-principal/>
        <v-content>
            <router-view/>
        </v-content>
    </div>
</template>

<script>
import BarraSuperior from '@/components/BarraSuperior.vue'
import MenuPrincipal from '@/components/MenuPrincipal.vue'

export default {
    components: {
        BarraSuperior,
        MenuPrincipal
    }
}
</script>

<style>
.bt-red {
    border-top: 3px solid red
}
</style>
