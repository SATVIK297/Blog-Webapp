
import User from "../Models/user.model.js";

import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js";

export const signup =async(req,res ,next)=>{

  const {username ,email, password} = req.body;
  
  if(!username || !password || !email ||  username==='' || password==='' || email==='' ){
    return next(errorHandler(400 , 'All fileds are required'))

  }

  const hashpassword = bcryptjs.hashSync(password,12);

  const newUser = new User({
    username,
    email,
    password : hashpassword
  })

  try{
    
    await newUser.save();
    res.status(200).json("signup successful")
  }catch(err){

    next(err)

  }



}