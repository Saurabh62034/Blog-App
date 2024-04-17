import express from 'express';
import {Create} from '../controllers/post.controller.js'
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/create", verifyToken, Create);

export default router;