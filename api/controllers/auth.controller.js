import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';

const Signup = async (req,res)=>{
     console.log(req.body);
     const {username, email, password} = req.body;
     if(!username || !email || !password || username==='' || email==='' || password===''){
          res.status(400).json({message:"Fill all the fields.All feilds are mendatory!"});
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
          res.status(500).json({message: e.message});
     }
     
}

export default Signup;