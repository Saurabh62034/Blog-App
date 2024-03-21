import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

const Signup = async (req,res,next)=>{
     console.log(req.body);
     const {username, email, password} = req.body;
     if(!username || !email || !password || username==='' || email==='' || password===''){
          next(error(400, 'All fields are required'));
     }
     const hashedPassword = bcryptjs.hashSync(password, 10);
     const user = new User({
          username,
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
export default Signup;