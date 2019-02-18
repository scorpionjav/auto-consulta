const mixinFormulario = {
    data(){
        return {
            error: '',
            valido : false,
            cargandoFormulario : false,
            email : '',
            password : '',
            rut: '',
            reglasRut :[
                (rut) => this.validarRut(rut) || 'Ingrese un RUT válido'
            ],
            reglasNombre :[
                (nombre) => nombre.length>0 || 'Debe ingresar un nombre valido',
                (nombre) => nombre.length<=25 || 'Debe ingresar menos de 25 caracteres'
            ],
            reglasEmail :[
                (email) => this.validarEmail(email) || 'Ingrese un correo válido'
            ],
            reglasPassword : [
                (password) => password.length>8 || 'Debe ingresar una contraseña mayor de 8 caracteres',
            ],
            reglasRepetirPassword : [
                (repetirPassword) => this.password === repetirPassword || 'Las contraseñas deben coincidir'
            ]
        }
    },
    methods:{
        validarEmail(email) {
            let r = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return r.test(String(email).toLowerCase());
        },
        validarRUT(rut) {
            let r = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
            if (!r.test(rut))
                return false;
            let temp = rut.split('-'),
                digv = temp[1],
                rutCorto = temp[0];
            rut = rut.toLowerCase();
            // Verifica que el Digito Verificador sea correcto
            let aux,
                m = 0,
                s = 1;
            for (; rutCorto; rutCorto = Math.floor(rutCorto / 10))
                s = (s + rutCorto % 10 * (9 - m++ % 6)) % 11;
            aux = s ? s - 1 : 'k'
            return digv == aux
        }
    }
}

export {
    mixinFormulario
}

/*
validarRUT(rut) {
    let re = /^[0-9]+[-|‐]{1}[0-9kK]{1}$/;
    if (!re.test(String(rut))) {
        return false;
    };
    let tmp = rut.split('-');
    let digv = tmp[1];
    let rutCorto = tmp[0];
    rut = rut.toLowerCase();
    // Verifica que el Digito Verificador sea correcto
    let aux;
    let M = 0, S = 1;
    for (; rutCorto; rutCorto = Math.floor(rutCorto / 10))
        S = (S + rutCorto % 10 * (9 - M++ % 6)) % 11;
    aux = S ? S - 1 : 'k';
    if (digv != aux) {
        return false;
    };
    return true
}
*/

/*
formatoRUT(rut) {
    rut = rut.replace(/\./g, '').replace('-', '')
    if (rut.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
        rut = rut.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4')
    }
    else if (rut.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
        rut = rut.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4')
    }
    else if (rut.match(/^(\d)(\d{3})(\d{0,2})$/)) {
        rut = rut.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3')
    }
    else if (rut.match(/^(\d)(\d{0,2})$/)) {
        rut = rut.replace(/^(\d)(\d{0,2})$/, '$1.$2')
    }
    this.rut = rut
}
*/
