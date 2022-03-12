const mongoose = require("../bin/mongodb");

// Crear schema
const encuestasSchema = mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        minLength:3,
        maxLength:30
    },
    nacimiento:{
        type:Date,
        required:true
    },
    genero:{
        type:String,
        required:true,
        enum: ["Hombre","Mujer"]
    },
    provincia:{
        type:String,
        required:true
    },
    valoracion:{
        type:Number,
        required:true
    },
    recomendacion:{
        type:String
    },
    comentario:{
       type:String,
       minLength:3,
       required:true
    }
});

// Crear modelo
module.exports = mongoose.model("encuestas" , encuestasSchema)