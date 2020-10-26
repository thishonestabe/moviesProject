const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'movies.json'
);

const getMoviesFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent.toString()));
        }
    });
};

module.exports = class Movie {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {


        getMoviesFromFile(movies => {
            if (this.id) {
                const existingMovieIndex = movies.findIndex(m => m.id === this.id);
                const updatedMovies = [...movies];
                updatedMovies[existingMovieIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedMovies), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                movies.push(this);
                fs.writeFile(p, JSON.stringify(movies), err => {
                    console.log(err);
                });
            }

        });
    }

    static deleteById(id) {
        getMoviesFromFile(movies => {
            const movie = movies.find(m => m.id === id)
            const updatedMovies = movies.filter(m => m.id !== id);
            fs.writeFile(p, JSON.stringify(updatedMovies), err => {
                if(!err) {
                    Cart.deleteMovie(id, movie.price);
                }

            })

        })

    }

    static fetchAll(cb) {
        getMoviesFromFile(cb);
    }

    static findById(id, cb) {
        getMoviesFromFile(movies => {
            const movie = movies.find(m => m.id === id);
            cb(movie)
        })
    }
};