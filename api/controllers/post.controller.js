import express from 'express'
import error from '../utils/error.js'
import Post from '../models/post.model.js';




export const Create = async (req, res, next)=>{
    
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

export const getposts = async (req, res, next)=>{
    try{
        console.log(req.user);
        
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === 'asc'? 1 : -1;
        const posts = await Post.find({
            ...(req.query.userId && {userId: req.query.userId}),
            ...(req.query.category && {category: req.query.category}),
            ...(req.query.slug && {slug: req.query.slug}),
            ...(req.query.postId && {_id: req.query.postId}),
            ...(req.query.searchTerm && {
                $or: [
                    {title: {$regex: req.query.searchTerm, $options: 'i'}},
                    {content: {$regex: req.query.searchTerm, $options: 'i'}}
                ],
            }),
        }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);

        const totalPosts = await Post.countDocuments();
        const now = new Date();

        const oneMonthAgo = new Date(now.getFullYear(),
        now.getMonth()-1,
        now.getDate()
    );
     const lastMonthPosts = await Post.countDocuments({
        createdAt: {$gte: oneMonthAgo}
     });

     res.status(200)
        .json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    }
    catch(error){
        next(error)
    }
}

export const deletePost = async (req, res, next)=>{
    if(!req.user.isAdmin || req.user.id !== req.params.userId){
        
        

        return next(error(403, 'You are nor allowed to delete this post.'));
    }
    try{
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json('The post has been deleted');
    }
    catch(e){
        
        next(e)
    }
}

export const updatePost = async (req,res,next)=>{
    
    const newslug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g,'-');

   if(!req.user.isAdmin || req.user.id != req.params.userId){
    return next(error(403, 'You are not allowed to update this post'))
   }
   try{
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId,{
        $set: {
            content: req.body.content,
            title: req.body.title,
            image: req.body.image,
            category: req.body.category,
            slug: newslug,
        },
     },{new: true});
    res.status(200).json(updatedPost);
   }
   catch(e){
    next(e);
   }
    
    
}