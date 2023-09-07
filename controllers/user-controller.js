import User from '../models/User.js';
import asyncHandler from 'express-async-handler';




//update
//@desc --UPDATES the user
//route --baseURL/api/users/update
//Type -- PUT
//@access -- private

const updateUser = asyncHandler(async (req,res) =>{
    if (req.user.id === req.params.id) {
        try {
            
            const user = await User.findById(req.user.id);
            if(user){
                user.name = req.body.name ||  user.name;
                user.email = req.body.email ||  user.email;
                user.profilePic = req.body.profilePic || user.profilePic;
                if(req.body.password){
                    user.password= req.body.password;
                }
                const updatedUser = await user.save();
                res.status(200).json({message: "User Updated Succesfully", ...updatedUser.toJSON()});
             }else{
                res.status(404);
                throw new Error("User not found");
            }

    



        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You can update only your account!");
      }
    });


//delete
//@desc --DELETES the user
//route --baseURL/api/users/delete
//Type -- DELETE
//@access -- private


const deleteUser = asyncHandler(async (req,res) =>{
    if (req.user.isAdmin) {
        const userIdToDelete = req.user.id; // Replace with the actual user ID you want to delete
        try {
            const result = await User.deleteOne({ _id: userIdToDelete });
            if (result.deletedCount === 1) {
                res.status(200).json("User deleted successfully.");
            } else {
                res.status(500).json(err);
                }
            } catch (error) {
                res.status(500).json(error);
            }
    }else{
        res.status(403).json("Not Authorized");
    }
});


//get
//@desc --GETS the user details
//route --baseURL/api/users/{id}
//Type -- GET
//@access -- public

const getUser = asyncHandler(async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user){
            res.status(200).json(user.toJSON());
        }else{
            res.status(404).json({message:`User not found for the id: ${req.params.id}`});    
        }
    }catch(error){
        res.status(500).json({message:"Something went wrong", error});
    }
})





//get all
//get
//delete
//@desc --GETS all the user details
//route --baseURL/api/users/
//Type -- GET
//@access -- private

const getAllUser = asyncHandler(async (req,res)=>{
    const query = req.query.new;
     if (req.user.isAdmin) {
        try {
            const users = query
              ? await User.find().sort({ _id: -1 }).limit(5)
              : await User.find();
            res.status(200).json(users);
          } catch (err) {
            res.status(500).json(err);
          }
    }else{
        res.status(403).json("NOT AUTHROZIED!");
    }
})

//get user stats
//get
//delete
//@desc --GETS specific user statistics
//route --baseURL/api/users/stats/
//Type -- GET
//@access -- private

const getUserStats= asyncHandler(async(req,res)=>{
    const today = new Date();
    const latYear = today.setFullYear(today.setFullYear() - 1);
  
    try {
      const data = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
})


export {updateUser, deleteUser, getUser, getAllUser, getUserStats};





