<template>
    <v-content class="grey lighten-2">
        <v-container fill-height>
            <v-layout align-center justify-center>
                <v-flex xs12 md4 text-xs-center>
                    <h1 class="display-2"><span class="font-weight-bold">Claro</span> Auto Consulta</h1>
                    <!-- <v-img :src="require('@/assets/form-logo.png')"></v-img> -->
                    <v-card class="my-3">
                        <v-card-text>
                            <h4>{{ titulo }}</h4>
                            <slot name="formulario"></slot>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    props:['titulo']
}
</script>

<style scope>
.display-2 {
    font-size: 40px !important;
}
</style>
