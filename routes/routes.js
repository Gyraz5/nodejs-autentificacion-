'use strict'

var express = require('express');

var peliculasController = 
require ('../controllers/peliculas');

var authenticationController 
= require("../controllers/autenticacion");

var token = require('../helpers/autenticacion');

var routes = express.Router();

routes.post('/api/crearPeliculas',
    token.validarToken,
    token.ValidarRol,
    peliculasController.crearPelicula
);

routes.get('/api/consultarPeliculas',
    token.validarToken,
    peliculasController.consultarPeliculas
);

routes.get('/api/consultarPeliculasPorParametros',
    token.validarToken,
    peliculasController.consultarPeliculasPorParametros
);

routes.post('/api/registro',
    authenticationController.registrarUsuario
);

routes.post('/api/login',
    authenticationController.iniciarSesion
);

module.exports = routes;
