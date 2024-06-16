const jwt = require("jsonwebtoken")
const secreto = "secretitos"

function generarToken(usuario){
    return jwt.sign({login: usuario.login}, secreto, {expiresIn: "2 hours"})
}

function comprobarToken(token){
    try{
        let verificado = jwt.verify(token, secreto)
        return verificado
    }
    catch(error){}
}

function guard(req, res, next){
    if(comprobarToken(req.headers["authorization"].substring(7)))
        next()
    else
        res.status(401).send({ok: false, error: "Usuario inautorizado"})
}

module.exports = {generarToken, guard}