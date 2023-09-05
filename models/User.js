import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type : String ,  //email is unique and it will be used as the username for login purpose in future
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true,
    },
    profilePic:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, {timestamps:true});

userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPasswords = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password) ;
}

userSchema.methods.toJSON = function(){
    const userData = this.toObject();
    delete userData.password;
    return userData;
}

const User = mongoose.model('User', userSchema);
export default User;