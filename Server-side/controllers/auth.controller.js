
import User from "../Models/user.model.js";

import bcryptjs from 'bcryptjs'

export const signup =async(req,res)=>{

  const {username ,email, password} = req.body;
  
  if(!username || !password || !email ||  username==='' || password==='' || email==='' ){
    return res.status(400).json({message : "all fields are required"})

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

    res.send(err.message)

  }



}