import  express from "express";
import { createComment ,getPostComments ,LikeComment,editComment ,deleteComment ,getComments} from "../controllers/comment.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()


router.post('/create',verifyToken, createComment)
router.get('/getPostComments/:postId' ,getPostComments )
router.put('/likeComment/:commentId',verifyToken ,LikeComment)
router.put('/editComment/:commentId',verifyToken ,editComment)
router.delete('/deleteComment/:commentId',verifyToken ,deleteComment)

// api route to get comments for admin dashboard
router.get('/getcomments',verifyToken ,getComments)

export default router;