import express from 'express'
import { signin, signup } from '../controllers/auth.controller.js';

const router  = express.Router();

//post request because we wante dto create something

router.post("/signup" , signup)
router.post("/signin" , signin)

export default router;