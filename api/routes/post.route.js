import express from 'express';
import {Create, deletePost, getposts, updatePost} from '../controllers/post.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, Create);
router.get('/getposts', getposts);
router.delete('/deletePost/:postId/:userId', verifyToken, deletePost);
router.put('/updatePost/:postId/:userId',verifyToken, updatePost);

export default router;