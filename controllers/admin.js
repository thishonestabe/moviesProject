const Movie = require('../models/movie');

exports.getAddMovie = (req, res, next) => {
    res.render('admin/add-movie', {
        pageTitle: 'Add Movie',
        path: '/admin/add-movie',
        formsCSS: true,
        mvoieCSS: true,
        activeAddMovie: true
    });
};

exports.postAddMovie = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const movie = new Movie(title, imageUrl, description, price);
    movie.save();
    res.redirect('/');
};

exports.getMovies = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('admin/movies', {
            movs: movies,
            pageTitle: 'Admin Movies',
            path: '/admin/movies'
        });
    });
};
