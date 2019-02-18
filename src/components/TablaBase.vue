<template>
    <v-layout mt-3 class="bt-red">
        <v-flex xs12>
            <v-card class="pa-3">
                <h3>Listado</h3>
                <v-card-title class="pa-0 pb-3">
                    <v-layout align-center justify-center row wrap>
                        <v-flex xs12 sm3 pa-2 v-for="n in Number(nroFiltros)" :key="n">
                            <v-layout row align-center justify-end>
                                <slot :name="`filtro-`+n"></slot>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-title>
                <slot name="tabla"></slot>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props:['nroFiltros']
}
</script>

<style>
th {
    font-weight: bold !important;
    color: black !important;
    border-top: .05rem solid grey 
}
th, td {
    padding-left: .5rem !important;
    padding-right: .5rem !important;
}
th:last-of-type {
    text-align: center !important
}
tbody tr:nth-child(odd){
    background: #E0E0E0;
}
.theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row){
    background: #BDBDBD;
}
</style>
