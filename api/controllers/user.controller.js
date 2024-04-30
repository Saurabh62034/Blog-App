import User from "../models/user.model.js";
import error from "../utils/error.js";
import bcryptjs from 'bcryptjs';

export const test = (req,res)=>{
    res.json({message:'API is working'})
}

export const updateUser = async (req,res, next)=>{
    console.log("update body :"+Object.keys(req.body));
    if(req.user.id !== req.params.userId){
        return next(error(403, 'You are not allowed to update this user'));
    }
    if(req.body.password){
        if(req.body.password.length<6){
            return next(error(400, 'Password must be at least 6 characters'));
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if(req.body.username){
        if(req.body.username.length<7 || req.body.username.length>20){
            return next(error(400, 'Username length must be between 7 and 20'));
        }
        if(req.body.username.includes(' ')){
            return next(error(400, 'username cannot include space'))
        }
        if(req.body.username!== req.body.username.toLowerCase()){
            return next(error(400, 'username should be in lowercase'));
        }
    }
        try{
            console.log("update: "+ req.body.email);
            const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePic: req.body.profilePic,
                    password: req.body.password,
                },
            }, {new: true});
            console.log("updateUser._doc = "+Object.keys(updatedUser._doc))
            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);
        }
        catch(e){
            next(e);
        }
    
}

export const deleteUser = async (req,res,next)=>{
    if(req.user.id !== req.params.userId){
        return next(error(403, 'you are not allowed to delete this user'));
    }
    try{
        await User.findByIdAndDelete(req.params.userId) 
        res.status(200).json('User has been deleted.');
    }
    catch(err){
        next(err);
    }
    
}

export const signoutUser = async (req, res, next) =>{
    try{
        res.clearCookie('access_token').status(200).json('User has been signed out');
    }catch(e){
        next(e);
    }
}

export const getUsers = async(req, res, next)=>{
    if(!req.user.isAdmin){
        return next(error(403, 'you are not allowed to see all users'));
    }
    try{
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1: -1;

        const users = await User.find()
        .sort({createdAt: sortDirection})
        .skip(startIndex)
        .limit(limit);

        const usersWithoutPassword = users.map((user)=>{
            const {password, ...rest} = user._doc;
            return rest;
        });

        const totalUsers = await User.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth()-1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: {$gte: oneMonthAgo},
        });

        res.status(200).json({
            users: usersWithoutPassword,
            totalUsers,
            lastMonthUsers
        });
    }
    catch(e){
        next(e);
    }
}

export default test;
