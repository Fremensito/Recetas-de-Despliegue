const mongoose = require ("mongoose")

const ingredienteSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        minLength: 2
    },

    cantidad: {
        type: Number,
        min: 1,
        required: true
    },

    unidad: {
        type: String,
        enum: ["gr", "cucharadas", "unidades"]
    }
})

const recetaSchema = mongoose.Schema({
    titulo: {
        type: String,
        minLength: 5,
        required: true
    },

    comensales: {
        type: Number,
        min: 1,
        required: true
    },

    preparacion: {
        type: Number,
        min: 1,
        required: true
    },

    coccion: {
        type: Number,
        min: 0,
        required: true
    },

    descripcion: {
        type: String,
        required: true
    },

    ingredientes: [ingredienteSchema]
})

let Receta = mongoose.model("recetas", recetaSchema)
module.exports = Receta
