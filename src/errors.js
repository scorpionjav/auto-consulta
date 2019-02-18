const map = new Map()
map.set("auth/user-not-found","El usuario no se encuentra registrado")
map.set("auth/wrong-password","Contraseña incorrecta")
map.set("auth/account-exists-with-different-credential","La cuenta ya estaba registrada usando un método de ingreso distinto.")
map.set("auth/email-already-in-use","El correo electrónico ya está registrado")
export default function(errorCode){
    console.log(errorCode)
    var mensaje = map.get(errorCode)
    if(!mensaje){
        return "Ha ocurrido un error mientras se realizaba esta acción. Por favor, comuníquese con soporte técnico"
    }
    else{
        return mensaje
    }
}
