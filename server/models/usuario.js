const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;

let rolesValidos ={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
};
let usuarioSchema = new Schema({
    nombre:{
        type: String,
        required:[true,'el nombre es necesario']
    },
    email:{
        type:String,
        unique:true,//esto se coloca para que no se pueda repetir una insercion del mismo correo
        required: [true,"EL correo es necesario"]
    },
    password:{//Crypted by hash method by one way
        type:String,
        required: [true,"EL pass es necesario"]
    },
    img:{
        type:String,
        required: false
    },
    role:{
        type:String,
        default:'USER_ROLE',
        enum:  rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});
usuarioSchema.methods.toJson = function(){//es para no devolver nunca el pass en la respuesta
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}
usuarioSchema.plugin(uniqueValidator,{message: '{PATH} Debe de ser Unico'});
module.exports= mongoose.model('usuario',usuarioSchema);