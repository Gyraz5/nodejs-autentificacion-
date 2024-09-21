'use strict'

const { response } = require("express");
var jwt = require("jwt-simple");
var moment = require("moment");
var secret = "kghgasdyRARWas!.";

function generarTokenUsuario(usuario){
    var payload = {
        sub: usuario._id,
        name: usuario.username,
        rol: usuario.rol,
        iat: moment.unix(),
        exp: moment().add(10, 'minutes').unix()
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, resp, nextStep){
    try{
        const tokenEnviadoPorUSuario = req.headers.authorization;
        if (!tokenEnviadoPorUSuario) {
            throw new Error('No se encontró el token en la cabecera de autorización');
        }
        console.log('Token antes de limpiar:', tokenEnviadoPorUSuario);
        var tokenLimpio = tokenEnviadoPorUSuario.replace('bearer', ' ').trim();
        console.log('Token después de limpiar:', tokenLimpio);
        var payload = jwt.decode(tokenLimpio, secret);
        req.header.UserId = payload.sub;
        nextStep();
    }
    catch(ex){
        console.log(ex);
        resp.status(403).send({message: "Token no valido"});
    }
}


function ValidarRol(req, res, next) {
    if (!req.user || !req.user.role) {
        return res.status(403).send('Access denied. No user role found.');
    }

    if (req.user.role !== 'admin') {
        return res.status(403).send('Access denied. You do not have the required role.');
    }

    next();
}

module.exports = {
    generarTokenUsuario, validarToken, ValidarRol
}
