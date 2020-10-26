const Movie = require('../models/movie');

exports.getMovies = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('shop/movie-list', {
            movs: movies,
            pageTitle: 'All Movies',
            path: '/movies'
        });
    });
};

exports.getMovie = (req, res, next) => {
    const movId = req.params.movieId;
    console.log(movId)
    Movie.findById(movId, movie => {
        res.render('shop/movie-detail', {movie: movie, pageTitle: movie.title, path: "/movies"});
    })

}

exports.getIndex = (req, res, next) => {
    Movie.fetchAll(movies => {
        res.render('shop/index', {
            movs: movies,
            pageTitle: 'Shop',
            path: '/'
        });
    });
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.postCart = (req, res, next) => {
    const movId = req.body.movieId;
    res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};