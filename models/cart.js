const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static  addMovie(id, moviePrice) {
        fs.readFile(p, (err, fileContent) => {
            let cart = {movies: [], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent.toString());
            }
            // console.log("CARRO: ", cart)
            const existingMovieIndex = cart.movies.findIndex(m => m.id === id);
            const existingMovie = cart.movies[existingMovieIndex];
            let updatedMovie;
            if (existingMovie) {
                updatedMovie = {...existingMovie};
                updatedMovie.qty = updatedMovie.qty + 1;
                cart.movies = [...cart.movies];
                cart.movies[existingMovieIndex] = updatedMovie;
            } else {
                updatedMovie = {id: id, qty: 1};
                cart.movies = [...cart.movies, updatedMovie];
            }
            cart.totalPrice = cart.totalPrice + +moviePrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })

        })
    }

    static deleteMovie(id, moviePrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = {...JSON.parse(fileContent.toString())};
            const movie = updatedCart.movies.find(m => m.id === id)
            if (!movie) {
                return;
            }
            const movieQty = movie.qty;
            updatedCart.movies = updatedCart.movies.filter(m => m.id !== id)
            updatedCart.totalPrice = updatedCart.totalPrice - moviePrice * movieQty;

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            })
        })
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent.toString());
            if(err) {

                cb(null);
            } else {
                cb(cart);
            }

        })

    }
}