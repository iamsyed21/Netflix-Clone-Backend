import Jwt from "jsonwebtoken";

const generateToken = (userID, isAdmin) =>{
    const token = Jwt.sign({id: userID, isAdmin: isAdmin}, process.env.JWT_SECRET, {expiresIn:"14d"});
    return token;
};

export default generateToken;