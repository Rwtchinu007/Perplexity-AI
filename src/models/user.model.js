import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    verified:{
        type: Boolean,
        default: false,
    },
},{timestamps: true});


// Hash password before saving
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return next(); // this line means if the password is not modified, then we don't need to hash it again, so we just call next() to move on to the next middleware or save operation.
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const userModel = mongoose.model("User", userSchema);
 
export default userModel;