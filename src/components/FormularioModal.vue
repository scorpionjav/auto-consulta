<template>
    <div>
        <v-dialog v-model="modal" max-width="720px" persistent>
            <v-card v-if="!exito">
                <v-card-title class="grey lighten-2 px-3 py-2 headline">
                    {{titulo}}
                    <v-spacer></v-spacer>
                    <v-btn
                        icon
                        left
                        @click="cerrar"
                        class="pa-0 my-0"
                        v-if="!ejecutando"
                        >
                        <v-icon>close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-form
                        v-model="valido"
                        slot="formulario"
                        ref="form"
                        >
                        <slot name="inputs"></slot>
                        <v-layout
                            v-if="!ejecutando"
                            justify-space-between
                            row
                            class="mt-3"
                            >
                            <v-btn
                                color="red font-weight-bold white--text"
                                @click="cerrar"
                                class="ml-0"
                            >Cancelar</v-btn>
                            <v-btn
                                color="green font-weight-bold white--text"
                                @click="accion"
                                :disabled="!valido"
                                class="mr-0"
                            >{{ btnText }}</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
                <v-card-text v-if="ejecutando" class="text-xs-center pt-0">
                    Ejecutando
                    <v-progress-linear
                        indeterminate
                        color="green"
                    ></v-progress-linear>
                </v-card-text>
                <v-card-text class="pt-0 mt-0" v-if="error">
                    <v-alert
                        type="error"
                        value="true"
                        transition="scale-transition"
                        dismissible
                        @click="cerrarError"
                        >
                        {{msgError}}
                    </v-alert>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="exito" max-width="320px" persistent>
            <v-alert
                type="success"
                value="true"
                icon="done_outline"
                @click="cerrarExito"
                >
                Se ha realizado con éxito
            </v-alert>
        </v-dialog>
    </div>

</template>

<script>

export default {
    props:['titulo','modal','btnText','exito','error','msgError'],
    data() {
        return {
            valido: false,
            ejecutando: false
        }
    },
    methods: {
        cerrar() {
            this.$emit('update:modal',false)
            this.$emit('update:error',false)
            this.$emit('update:msgError','')
            //this.$emit('update:estado',false)
            this.ejecutando = false
            this.$refs.form.resetValidation()
            //this.$refs.form.reset() // DEJARLO solo prueba cuentas
        },
        accion() {
            //this.$emit('update:estado',true)
            this.ejecutando = true
            this.$emit('btnAccion')
        },
        cerrarExito() {
            this.$emit('update:exito', false)
        },
        cerrarError() {
            this.$emit('update:error', false)
        }
    },
    watch: {
        exito (val) {
            if (val) {
                this.cerrar()
                setTimeout(() => (
                    this.cerrarExito()
                ), 2000)
            }
        },
        error(val) {
            if(val) {
                //this.$emit('update:estado', false)
                this.ejecutando = false
                setTimeout(() => (
                    this.cerrarError()
                ), 5000)
            }
        }
    }

}
</script>

<style scope>
.v-card__title {
    min-height: 52px;
}
</style>
