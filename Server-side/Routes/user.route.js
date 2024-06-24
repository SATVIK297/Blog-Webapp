import express from 'express'
import { test, updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router  = express.Router();



router.get('/test' , test)

//we are using put request because we want to update the user

router.put('/update/:userId' ,verifyToken, updateUser)

export default router