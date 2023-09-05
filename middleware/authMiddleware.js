import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
// import User from "../model/user.js";

const protect = asyncHandler(async (req, res, next) => {
    let authHeader = req.headers.token;
  
    if (authHeader) {
      try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          // Handle token expiration
          res.status(401).json({ error: "Token has expired, please log in again" });
        } else {
          // Handle other token verification errors
          res.status(401).json({ error: "Not Authorized, invalid token" });
        }
      }
    } else {
      res.status(401).json({ error: "Not Authorized, no token found" });
    }
  });


export default protect;