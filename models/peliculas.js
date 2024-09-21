'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PeliculaSchema = Schema({
    titulo: String,
    director : String,
    añodelanzamiento: Number,
    productores: String,
    precio: Number
});

module.exports =
    mongoose.model('pelicula', 
        PeliculaSchema);
