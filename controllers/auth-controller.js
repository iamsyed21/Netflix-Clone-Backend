import User from '../models/User.js';
import asyncHandler from 'express-async-handler';
import generateToken from '../util/generateToken.js';


//@desc --Registers the user
//route --baseURL/api/auth/register
//@access -- public
const registerUser = asyncHandler(async(req, res) =>{
    const {email, password, name, profilePic, isAdmin} = req.body;
    const userExists = await User.findOne({email});
    if (userExists){
        res.status(409);
        throw new Error("User already exists");
    }

    const user = await User.create({name,email,password,profilePic,isAdmin});
    if(user){
        res.status(201).json(user.toJSON());
    }else{
        res.status(400);
        throw new Error("INVALID USER DATA");
    }
    
});

//@desc --Login the user
//route --baseURL/api/auth/login
//@access -- public
//testuser - john@email.com
//password - 123456
const LoginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    const userExists = await User.findOne({email});
    //todo:encrypt
    if (userExists && (userExists.matchPasswords(password))){
        //generate token

        const token = generateToken(userExists._id, userExists.isAdmin);
        res.status(201).json({message:"Logged In Succesfully", ...userExists.toJSON(), token});
    }else{
        res.status(403);
        throw new Error('Invalid Credentials');
    }
    
});

//@desc -- Logout the user
//route -- baseURL/api/auth/logout
//@access -- private (assuming you require authentication for logout)
const LogoutUser = asyncHandler(async (req, res) => {
    // In a typical session-based authentication system, you would invalidate the session or token here.
    // For JSON Web Tokens (JWT), you usually don't have to do anything on the server side to log out,
    // as JWTs are stateless. Instead, you handle logout on the client-side by discarding the token.
  
    // Optionally, you can add server-side logic here to handle more complex logout scenarios,
    // such as blacklisting tokens or managing sessions.
  
    // Respond with a success message indicating the user has been logged out.
    res.status(200).json({ message: "Logged out successfully" });
  });


export {registerUser, LoginUser, LogoutUser};
