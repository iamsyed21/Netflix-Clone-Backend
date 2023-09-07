import express from "express";
import { createMovie, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies, getMoviesByGenre, 
    getMoviesByGenreAndType, getRandomMovieByGenreAndType, getRandomMoviesAndSeries } from "../controllers/movie-controller.js";
import protect from "../middleware/authMiddleware.js";



const router = express.Router();
router.post('/',protect, createMovie);
router.put('/:id',protect, updateMovie);
router.delete('/:id',protect, deleteMovie);
router.get('/find/:id', getMovie);
router.get('/random', getRandomMovie);
router.get('/', getAllMovies);
router.get('/genre/', getMoviesByGenre);
router.get('/genres/', getMoviesByGenreAndType);
router.get('/randoms/', getRandomMovieByGenreAndType);
router.get('/getmylist', getRandomMoviesAndSeries);



// router.post('/', protect, createMovie);
// router.put('/:id', protect, updateMovie);
// router.delete('/:id', protect, deleteMovie);
// router.get('/find/:id', getMovie);
// router.get('/random', getRandomMovie);
// router.get('/', getAllMovies);
export default router;