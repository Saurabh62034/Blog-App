import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userrouter from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import commentRoute from './routes/comment.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("connected")
})
.catch((e)=>{
    console.log(e.message);
})

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());



app.listen(3000, ()=>{
    console.log("server is running on port 3000!");
})

app.use("/api/user",userrouter);
app.use("/api/auth",authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoute);

app.use(express.static(path.join(__dirname, '/enlighten-nest/dist')));

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname,'enlighten-nest','dist','index.html'));
});


app.use((err, req, res, next) =>{
    const statusCode = err.statusCode||500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})