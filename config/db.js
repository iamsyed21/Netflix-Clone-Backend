import mongoose from "mongoose";
const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    }catch(err){
        console.log("Error connecting to MongoDB Atlas", err);
        process.exit(1);
    }
};

export default connectDB;