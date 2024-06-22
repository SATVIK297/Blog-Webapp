import express from 'express'
import { google, signin, signup } from '../controllers/auth.controller.js';

const router  = express.Router();

//post request because we wante dto create something

router.post("/signup" , signup)
router.post("/signin" , signin)
router.post("/google" , google)

export default router;