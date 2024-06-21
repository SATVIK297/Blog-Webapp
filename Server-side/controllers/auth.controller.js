import User from "../Models/user.model.js";
import jwt from 'jsonwebtoken';

import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username === "" ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "All fileds are required"));
  }

  const hashpassword = bcryptjs.hashSync(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();
    res.status(200).json("signup successful");
  } catch (err) {
    next(err);
  }
};



export const signin = async (req,res,next)=>{
  const {  email, password } = req.body;

  if (
    !password ||
    !email ||
    password === "" ||
    email === ""
  ) {
    return next(errorHandler(400, "All fileds are required"));
  }
  
  try{

    const validuser = await User.findOne({email});
    if(!validuser){
      return next(errorHandler(404,"User not found"));
    }

    const validpassword =  bcryptjs.compareSync(password , validuser.password)
    if(!validpassword){
      return next(errorHandler(400 , 'Invalid Credentials'))
    }

    const token = jwt.sign(
      {id: validuser._id},
      process.env.JWT_SECRET
    )

    const {password : pass , ...rest} = validuser._doc;



    res.status(200).cookie('access token ' , token, {
      httpOnly :true
    }).json(rest)

    // we sent back the valid user beacuse we need his information in redux toolkit




  }catch(error){
    next(error);
  }



}