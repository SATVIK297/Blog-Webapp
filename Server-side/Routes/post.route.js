import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { create ,getposts ,deleteposts} from '../controllers/post.controller.js';

const router  = express.Router();


router.post('/create' ,verifyToken, create)
//anyone without verifying can see the post therefore we dont need the verification token

router.get('/getposts' , getposts)
router.delete('/deletepost/:postId/:userId' ,verifyToken, deleteposts)


export default router;