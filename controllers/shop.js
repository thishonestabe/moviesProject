const Movie = require('../models/movie');
const Cart = require('../models/cart');

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
    Cart.getCart(cart => {
        Movie.fetchAll(movies => {
            const cartMovies = []
            for (let movie of movies) {
                const cartMovieData = cart.movies.find(m => m.id === movie.id)
                if(cartMovieData) {
                    cartMovies.push({movieData: movie, qty: cartMovieData.qty});
                }
            }
            res.render('shop/cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                movies: cartMovies
            });
        })

    })

};

exports.postCart = (req, res, next) => {
    const movId = req.body.movieId;
    console.log(movId);
    Movie.findById(movId, (movie) => {
        Cart.addMovie(movId, movie.price)
    })
    res.redirect('/cart')
}

exports.postCartDeleteMovie = (req, res, next) => {
    const movId = req.body.movieId;
    Movie.findById(movId, movie => {
        Cart.deleteMovie(movId, movie.price);
        res.redirect('/cart');
    })

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