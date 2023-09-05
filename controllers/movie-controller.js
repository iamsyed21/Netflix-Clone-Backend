import Movie from '../models/Movie.js';
import asyncHandler from 'express-async-handler';

//create
//@desc --creates the movie
//route --baseURL/api/movies/
//Type -- POST
//@access -- private
const createMovie = asyncHandler(async(req, res) =>{
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
          const savedMovie = await newMovie.save();
          res.status(201).json(savedMovie);
        } catch (err) {
          res.status(500).json(err);
        }
    }else{
        res.status(403).json("NOT AUTHROZIED!");
    }
    
});





//update
//@desc --UPDATES the movie
//route --baseURL/api/movies/id
//Type -- PUT
//@access -- private

const updateMovie = asyncHandler(async (req,res) =>{
    if (req.user.isAdmin) {
        try {
            
            const movie = await Movie.findById(req.params.id);
            if(movie){
                movie.title = req.body.title || movie.title;
                movie.desc = req.body.desc || movie.desc;
                movie.img = req.body.img || movie.img;
                movie.imgTitle = req.body.imgTitle || movie.imgTitle;
                movie.imgSm = req.body.imgSm || movie.imgSm;
                movie.trailer = req.body.trailer || movie.trailer;
                movie.video = req.body.video || movie.video;
                movie.year = req.body.year || movie.year;
                movie.limit = req.body.limit || movie.limit;
                movie.genre = req.body.genre || movie.genre;
                movie.isSeries = req.body.isSeries || movie.isSeries;
                
                const updatedMovie = await movie.save();
                res.status(200).json({message: "Movie Updated Succesfully", updatedMovie});
             }else{
                res.status(404).json({message:`Movie Not found for id:${req.params.id}`});
                throw new Error("Movie not found!");
            }

    



        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("NOT AUTHORIZED!!!!!");
      }
    });


//delete
//@desc --DELETES the movie
//route --baseURL/api/movies/delete
//Type -- DELETE
//@access -- private
const deleteMovie = asyncHandler(async (req,res) =>{
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie deleted successfully.");  
            } catch (error) {
                res.status(500).json(error);
            }
    }else{
        res.status(403).json("NOT AUTHORIZED!!!!");
    }
});


//get
//@desc --GETS the movie details
//route --baseURL/api/movies/{id}
//Type -- GET
//@access -- public

const getMovie = asyncHandler(async (req,res)=>{
    try{
        const movie = await Movie.findById(req.params.id);
        if(movie){
            res.status(200).json(movie);
        }else{
            res.status(404).json({message:`Movie not found for the id: ${req.params.id}`});    
        }
    }catch(error){
        res.status(500).json({message:"Something went wrong", error});
    }
});

//get
//@desc --GETS random movie details
//route --baseURL/api/movies/random
//Type -- GET
//@access -- public
const getRandomMovie = asyncHandler(async (req,res)=>{
    const type = req.query.type;
  try {
    let movie;
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
}catch(error){
        res.status(500).json({message:"Something went wrong", error});
    }
});



//get all
//get
//delete
//@desc --GETS all the user details
//route --baseURL/api/users/
//Type -- GET
//@access -- private

const getAllMovies = asyncHandler(async (req,res)=>{
    try {
        const movies = await Movie.find();
            res.status(200).json(movies);
          }catch (err) {
            res.status(500).json(err);
          }
    
});






export {createMovie, updateMovie, deleteMovie, getMovie, getRandomMovie, getAllMovies};





