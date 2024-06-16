const express = require("express")
const { generarToken } = require("../auth/auth")

let router = express.Router()

const usuarios = [
    {
        login: "user1",
        password: "contrasenya1"
    },

    {
        login: "user2",
        password: "contrasenya2"
    }
]

router.post("/login", (req, res) => {

    let token

    const usuario = {
        login: req.body.login,
        password: req.body.password
    }

    loginCorrecto = usuarios.find(u => usuario.login === u.login && usuario.password == u.password)

    if(loginCorrecto)
        res.status(200).send({ok: true, resultado: generarToken(usuario)})
    else
        res.status(401).send({ok: false, error: "Usuario no válido"})
})

module.exports = router;