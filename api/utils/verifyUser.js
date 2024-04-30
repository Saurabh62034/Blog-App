import jwt from 'jsonwebtoken';
import error from './error.js';

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token;
    if(!token){
        return next(error(401, 'Unauthorized. Try sign-out and sign-in again'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return next(error(401, 'Unauthorized'));
        }
        req.user = user;
        next();
    })
}