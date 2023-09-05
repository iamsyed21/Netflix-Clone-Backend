import mongoose from "mongoose";
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title:{
        type:String,
        required: true,
        unique:true
    },
    desc:{
        type : String ,  //email is unique and it will be used as the username for login purpose in future
    },
    img:{
        type: String,
    },
    imgTitle:{
        type: String,
    },
    imgSm:{
        type: String,
    },
    trailer:{
        type: String,
    },
    video:{
        type: String,
    },
    year:{
        type: String,
    },
    limit:{
        type: Number,
    },
    genre:{
        type: String,
    },
    isSeries:{
        type: Boolean, default: false
    },
}, {timestamps:true});


const Movie = mongoose.model('Movie', movieSchema);
export default Movie;