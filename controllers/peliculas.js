'use strict'

var Cursos = require('../models/peliculas');

function crearPelicula(req, resp){

    var peliculaRecibida = req.body;

    var nuevaPelicula = new Cursos();
    nuevaPelicula.titulo = peliculaRecibida.titulo;
    nuevaPelicula.director = peliculaRecibida.director;
    nuevaPelicula.añodelanzamiento = peliculaRecibida.añodelanzamiento;
    nuevaPelicula.procutores =  peliculaRecibida.productores;
    nuevaPelicula.precio = peliculaRecibida.precio;

    
    nuevaPelicula.save().then(
        (peliculaGuardada) => {
            resp.status(200)
            .send({peliculaCreada: peliculaGuardada });
        },
        err => {
            resp.status(500)
            .send({
                message: "No se pudo crear intente nuevamente"
            });
        }
    );
}

function consultarPeliculas(req, res){
    try {
        const Peliculas = pelicula.find();
        res.status(200).send(Peliculas);
    } catch (error) {
        res.status(500).send({ message: 'Error al consultar películas' });
    }
};


function consultarPeliculasPorParametros(req, res){
    const { anio, precio } = req.query;
    try {
        const Peliculas =  pelicula.find({
            anioLanzamiento: { $gt: anio },
            precio: { $lte: precio }
        });
        res.status(200).send(peliculas);
    } catch (error) {
        res.status(500).send({ message: 'Error al consultar películas' });
    }
};

module.exports = {
    crearPelicula,
    consultarPeliculas,
    consultarPeliculasPorParametros
} 
