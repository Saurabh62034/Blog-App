import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";
import error from "../utils/error.js";

const Signup = async (req,res,next)=>{
     console.log("this is auth.controller.js    = "+req.body.email);
     console.log(req.body);
     const {username, email, password} = req.body;
     if(!email || !email || !password || email==='' || email==='' || password===''){
          next(error(400, 'All fields are required'));
     }
     const hashedPassword = bcryptjs.hashSync(password, 10);
     const user = new User({
          email,
          email,
          password: hashedPassword
     });
     try{
          await user.save();
          res.json({message:'signup successful'})
     }
     catch(e){
          next(e);
     }    
}

export const Signin = async (req,res,next)=>{
     console.log("signin invoked: "+req.body);
     const {email, password} = req.body;
     if(!email || !password || email==='' || password===''){
          return next(error(400, 'All fields are required'));
     }
     try{
          const validUser = await User.findOne({email});
          if(!validUser){
               return next(error(404,'User not found.'));
          }
          const validPassword =bcryptjs.compareSync(password, validUser.password);
          if(!validPassword){
               return next(error(400, 'Invalid Password'));
          }

          const token = jwt.sign(
               {id: validUser._id}, process.env.JWT_SECRET
          );
          const {password: pass, ...rest} = validUser._doc;
          res.status(200).cookie('access_token', token, {
               httpOnly: true,
          })
          .json(rest);
     }catch(e){
          next(e);
     }
}

export default Signup;