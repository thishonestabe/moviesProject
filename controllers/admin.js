const Movie = require('../models/movie');

exports.getAddMovie = (req, res, next) => {
    res.render('admin/edit-movie', {
        pageTitle: 'Add Movie',
        path: '/admin/add-movie',
        formsCSS: true,
        mvoieCSS: true,
        activeAddMovie: true,
        editing: false,
    });
};

exports.postAddMovie = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const movie = new Movie(null, title, imageUrl, description, price);
    movie.save();
    res.redirect('/');
};

exports.getEditMovie = (req, res, next) => {
    const editMode = req.query.edit
    if (!editMode) {
        return res.redirect('/');
    }
    const movId = req.params.movieId;
    Movie.findById(movId, m => {
        if (!m) {
            return res.redirect('/');
        }
        //m.price = +m.price
        console.log("M: ", m)
        res.render('admin/edit-movie', {
            pageTitle: 'Edit Movie',
            path: '/admin/edit-movie',
            formsCSS: true,
            mvoieCSS: true,
            activeAddMovie: true,
            editing: editMode,
            movie: m
        });
    });

};

exports.postEditMovie = (req, res, next) => {
    const movId = req.body.movieId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImage = req.body.imageUrl;
    const updatedDescription = req.body.description;
    const movie = new Movie(movId, updatedTitle, updatedImage, updatedDescription, updatedPrice);
    movie.save();
    res.redirect('/');
}

exports.getMovies = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('admin/movies', {
            movs: movies,
            pageTitle: 'Admin Movies',
            path: '/admin/movies'
        });
    });
};

exports.deleteMovies = (req, res, next) => {
    const movieId = req.body.movieId;
    Movie.deleteById(movieId);
    res.redirect('/admin/movies');
}
