const express = require("express")
const mongoose = require("mongoose")

const receta = require(__dirname + "/routes/recetas")
const auth = require(__dirname + "/routes/auth")

mongoose.connect("mongodb://localhost:27017/recetas")

const app = express()

app.use(express.json())
app.use("/recetas", receta)
app.use("/auth", auth)

app.listen(8080)