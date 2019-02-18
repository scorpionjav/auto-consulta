<template>
    <v-container fluid>
        <h2>Dashboard<span class="ml-2 caption">Página Principal</span></h2>
        <v-divider/>
        <v-layout text-xs-left wrap>
            <widget :valor="tPendientes" titulo="Tickets pendiente (día)" bgColor="light-blue" icon="today"></widget>
            <widget :valor="tCerrados" titulo="Tickets cerrados (día)" bgColor="green" icon="event_available"></widget>
            <widget :valor="tAsignados" titulo="Tickets asignados (día)" bgColor="orange" icon="event_note"></widget>
            <widget :valor="tTotal" titulo="Tickets pendientes (total)" bgColor="red" icon="event_busy"></widget>
        </v-layout>
        <v-layout mt-3 class="bt-red">
            <v-flex xs12>
                <v-card class="pa-3">
                    <h3>Tickets diarios</h3>
                    <GChart
                        type="AreaChart"
                        :data="chartData"
                        :options="chartOptions"
                        :resizeDebounce = "1"
                    />
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Widget from '@/components/Widget.vue'

export default {
    components: {
        Widget
    },
    data() {
        return { // solo prueba
            tPendientes:'10',
            tCerrados: '5',
            tAsignados: '2',
            tTotal: '20',
            // Google Charts
            // https://github.com/devstark-com/vue-google-charts?ref=madewithvuejs.com#usage
            // Datos de prueba
            chartData: [
                ['Día', 'Pendientes', 'Cerrados', 'Asignados'],
                ['2014', 20, 5, 2],
                ['2015', 500, 100, 10],
                ['2016', 200, 50, 20],
                ['2017', 100, 54, 35]
            ],
            chartOptions: {
                title: '',
                legend: { position: 'bottom', alignment: 'end' },
            }
        }
    }
}
</script>

<style>

</style>
