const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getMoviesFromFile(movies => {
            movies.push(this);
            fs.writeFile(p, JSON.stringify(movies), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(cb) {
        getMoviesFromFile(cb);
    }
};