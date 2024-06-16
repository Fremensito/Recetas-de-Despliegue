const express = require("express")
const { guard } = require("../auth/auth")

const Receta = require(__dirname + "/../models/receta.js")

let router = express.Router()

router.get("/", (req, res) => {
    Receta.find()
    .then(resultado =>{
        if(resultado.length == 0)
            res.status(500).send({ok: false, error: "No se encontraron recetas"})
        else
            res.status(200).send({ok: true, resultado: resultado})
    })
    .catch(error => res.status(500).send({ok: false, error: "No se encontraron recetas"}))
})

router.get("/:id", (req, res) => {
    Receta.findById(req.params.id)
    .then(resultado => {
        if(resultado == null)
            res.status(400).send({ok: false, error: "Receta no encontrada"})
        else
            res.status(200).send({ok: true, resultado: resultado})
    })
    .catch(error => res.status(400).send({ok: false, error: "Receta no encontrada"}))
})

router.post("/", guard, (req, res) => {
    const receta = new Receta({
        titulo: req.body.titulo,
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion,
        ingredientes: req.body.ingredientes
    })

    receta.save()
    .then(resultado => res.status(200).send({ok: true, resultado: resultado}))
    .catch(error => {
        res.status(400).send({ok: false, error: "Error insertando receta"})
    })
})

router.put("/elementos/:id", guard, (req, res) => {
    Receta.findById(req.params.id)
    .then(resultado => {
        resultado.ingredientes.push(req.body)
        return Receta.findByIdAndUpdate(req.params.id, {$set: {"ingredientes": resultado.ingredientes,}}, {new: true, runValidators: true})})
    .then(resultado => res.status(200).send({ok: true, resultado: resultado}))
    .catch(error => res.status(400).send({ok: false, error: "Error modificando elementos de la receta"}))
})

router.put("/:id", guard, (req, res) => {
    if (req.body.ingredientes){
        return res.status(400).send({ok: false, error: "Error modificando receta"})
    }

    Receta.findByIdAndUpdate(req.params.id, {
        titulo: req.body.titulo, 
        comensales: req.body.comensales,
        preparacion: req.body.preparacion,
        coccion: req.body.coccion,
        descripcion: req.body.descripcion
    }, {new: true, runValidators: true})
    .then(resultado => {
        console.log(resultado)
        if(resultado)
            res.status(200).send({ok: true, resultado: resultado})
        else
            res.status(400).send({ok: false, error: "Error modificando receta"})
    })
})

router.delete("/:id", guard, (req, res) => {
    Receta.findByIdAndDelete(req.params.id)
    .then(resultado =>{
        if(resultado)
            res.status(200).send({ok: true, resultado: resultado})
        else
            res.status(400).send({ok: false, error: "Error eliminando receta"})
    })
    .catch(error => res.status(400).send({ok: false, error: "Error eliminando receta"}))
})

module.exports = router