import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3000;
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import movieRouter from './routes/movies.js'
import listRouter from './routes/lists.js'
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/movies', movieRouter);
app.use("/api/lists", listRouter)
app.use(notFound);
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});