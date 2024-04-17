import express from 'express'
import error from '../utils/error.js'
import Post from '../models/post.model.js';
import User from '../models/user.model.js';



export const Create = async (req, res, next)=>{
    console.log("post route"+req.user);
    if(!req.user.isAdmin){
        return next(error(403, 'you are not allowed to create post'));
    }
    if(!req.body.title || !req.body.content){
        return next(error(400, 'plaese provide all required field'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');
    const newPost = new Post({
        ...req.body, slug, userId: req.user.id,
    });
    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    }
    catch(e){
        return next(e);
    }
};