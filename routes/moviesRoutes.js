const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/moviesController');
const auth = require('../middleware/is-auth');

router.get('/movies/:id', auth, moviesController.getMovieById);

router.get('/movies', auth, moviesController.getMovies);

router.post('/movies', auth, moviesController.postMovie);

router.post('/movies/:id', auth, moviesController.postMovieById)

router.delete('/movies/:id', auth, moviesController.deleteMovie)

module.exports = router;