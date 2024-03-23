import express from 'express';
import signup from '../controllers/auth.controller.js';
import { Signin } from '../controllers/auth.controller.js';


const router = express.Router();

router.post('/signup',signup);
router.post('/signin',Signin);
export default router;