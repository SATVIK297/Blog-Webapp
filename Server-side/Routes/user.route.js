import express from 'express'
import { deleteUser, test, updateUser,signOut,getUsers ,getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router  = express.Router();



router.get('/test' , test)

//we are using put request because we want to update the user

router.put('/update/:userId' ,verifyToken, updateUser)
router.delete('/delete/:userId' ,verifyToken, deleteUser)
router.post('/signout' , signOut)
router.get('/getusers',verifyToken,getUsers)
//getusers for comment section
router.get('/:userId' ,getUser);

export default router