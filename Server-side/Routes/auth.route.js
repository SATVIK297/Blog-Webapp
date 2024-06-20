import express from 'express'
import { signup } from '../controllers/auth.controller.js';

const router  = express.Router();

//post request because we wante dto create something

router.post("/signup" , signup)

export default router;