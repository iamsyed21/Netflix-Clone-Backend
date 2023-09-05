import express from "express";
import { createMovie, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies } from "../controllers/movie-controller.js";
import protect from "../middleware/authMiddleware.js";



const router = express.Router();
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);
router.get('/find/:id', getMovie);
router.get('/random', getRandomMovie);
router.get('/', getAllMovies);
export default router;