<template>
    <v-flex xs12 lg3 px-3 pt-3>
        <v-hover>
        <v-card :color="bgColor" class="white--text" :class="`elevation-${hover ? 12 : 2}`" slot-scope="{ hover }">
            <v-layout row align-center justify-center fill-height>
                <v-flex xs9>
                    <v-card-title class="pa-2">
                        <div>
                            <h3 class="headline font-weight-bold">{{ valor }}</h3>
                            <div>{{ titulo }}</div>
                        </div>
                    </v-card-title>
                </v-flex>
                <v-flex xs3 text-xs-center mt-1>
                    <v-icon :color="`${bgColor} darken-2`">{{ icon }}</v-icon>
                </v-flex>
            </v-layout>
        </v-card>
        </v-hover>
    </v-flex>
</template>

<script>
export default {
    props: ['valor', 'titulo', 'bgColor', 'icon']
}
</script>

<style scoped>
.v-icon {
    font-size: 3.5rem;
}
</style>
