const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage");
const validacion = require("../util/validaciones");
const bcrypt = require("bcrypt");

// Crear schema
const usersSchema = mongoose.Schema({
    user:{
        type:String,
        unique:[true,errorMessage.GENERAL.campo_unico],
        minLength:[3,errorMessage.GENERAL.minlength],
        required:[true,errorMessage.GENERAL.campo_obligatorio]
    },
    email:{
        type:String,
        unique:[true,errorMessage.GENERAL.campo_unico],
        validate:{
            validator: function(value){
                return validacion.aceptableMail(value)
            },
            message:errorMessage.USUARIOS.errorEmail
        }
    },
    password:{
        type:String,
        unique:[true,errorMessage.GENERAL.campo_unico],
        required:[true,errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: function(value){
                return validacion.aceptablePassword(value)
            },
            message:errorMessage.USUARIOS.errorPassword
        }
    }
});

usersSchema.pre("save",function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
});

// Crear modelo
module.exports = mongoose.model("users" , usersSchema)