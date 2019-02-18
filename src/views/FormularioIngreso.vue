<template>
    <formulario-base titulo="Ingresa con tus credenciales">
        <v-form v-model="valido" slot="formulario">
            <v-text-field
                clearable
                prepend-icon="person"
                label="RUT"
                v-model="rut"
                :rules="reglasRut"
                required
            />
            <v-text-field
                clearable
                prepend-icon="lock"
                label="Contraseña"
                type="password"
                v-model="contrasenna"
                :rules="reglasConstrasenna"
                required
            />
            <v-btn
                :disabled="!valido"
                block
                class="primary mt-3"
                @click="iniciarSesion"
                :loading="iniciando"
            >INGRESAR</v-btn>
            <v-btn color="success" @click="inicioRapido">inicio rapido</v-btn>
            <v-alert
                class="mt-3"
                type="error"
                dismissible
                transition="scale-transition"
                :value="error"
                @click="limpiar"
            >
                RUT y/o Contraseña incorrectos
            </v-alert>
        </v-form>
    </formulario-base>
</template>

<script>
import FormularioBase from '@/components/FormularioBase.vue'

export default {
    components: {
        FormularioBase
    },
    data() {
        return {
            error: false,
            valido: false,
            iniciando : false,
            rut: '',
            contrasenna: '',
            reglasRut: [
                rut => this.validarRUT(rut) || 'Ingrese un RUT válido'
            ],
            reglasConstrasenna: [
                contrasenna => (contrasenna !='' && contrasenna != null)  || 'Ingrese Contraseña'
            ],
        }
    },
    methods:{
        validarRUT(rut) {
            if(rut !='' && rut != null) {
                rut = rut.replace(/[^0-9kK]/g, '');
                if(rut.length < 8)
                    return false;
                let digv = rut.substr(-1).toUpperCase(),
                    resto = rut.substr(0,rut.length-1);
                let aux,
                    m = 0,
                    s = 1;
                for (; resto; resto = Math.floor(resto / 10))
                    s = (s + resto % 10 * (9 - m++ % 6)) % 11;
                aux = s ? s - 1 : 'K'
                this.formatoRUT(rut)
                return digv == aux
            }
        },
        formatoRUT(rut) {
            rut = rut.replace(/\./g, '').replace('-', ''),
            rut.match(/^(\d{2})(\d{3}){2}(\w{1})$/) ? rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
            : rut.match(/^(\d)(\d{3}){2}(\w{0,1})$/) ? rut = rut.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4')
            : rut.match(/^(\d)(\d{3})(\d{0,2})$/) ? rut = rut.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3')
            : rut.match(/^(\d)(\d{0,2})$/) && (rut = rut.replace(/^(\d)(\d{0,2})$/, '$1.$2')),
            this.rut = rut
        },
        iniciarSesion() {
            this.iniciando = true
            this.$store.dispatch('iniciarSesion', {
                rut: this.rut,
                contrasenna: this.contrasenna
            }).then((user) => {
                this.iniciando = false
                this.$router.replace(this.$route.query.redirect || '/')
                this.limpiar()
            }).catch((error) => {
                this.iniciando = false
                this.error = error
            })
        },
        limpiar() {
            this.rut = ''
            this.contrasenna = ''
            this.iniciando = false
            this.error = false
        },
        inicioRapido() { // eliminar
            this.rut='12345678-5'
            this.contrasenna='admin'
        }
    }
}
</script>

<style scoped>

</style>
