import express from 'express';
import {Create, getposts} from '../controllers/post.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, Create);
router.get('/getposts', getposts);

export default router;