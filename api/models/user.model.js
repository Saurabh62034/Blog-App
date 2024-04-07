import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2016/12/10/05/16/profile-1896698_1280.jpg"
    }
    
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;
