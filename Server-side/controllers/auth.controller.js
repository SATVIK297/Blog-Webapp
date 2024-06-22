import User from "../Models/user.model.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email || password === "" || email === "") {
    return next(errorHandler(400, "All fileds are required"));
  }

  try {
    const validuser = await User.findOne({ email });
    if (!validuser) {
      return next(errorHandler(404, "User not found"));
    }

    const validpassword = bcryptjs.compareSync(password, validuser.password);
    if (!validpassword) {
      return next(errorHandler(400, "Invalid Credentials"));
    }

    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validuser._doc;

    res
      .status(200)
      .cookie("access token ", token, {
        httpOnly: true,
      })
      .json(rest);

    // we sent back the valid user beacuse we need his information in redux toolkit
  } catch (error) {
    next(error);
  }
};


// export const google = async (req, res, next) => {
//   const { name, email, googlePhotoUrl } = req.body;
//   //firstly we will check if the user exists

//   try {
//     const user = await User.findOne({ email });
//     if (user) {
//       //if user exists then we will generate token and send it back
//       const token = jwt.sign({ id: user._id,isAdmin: user.isAdmin }, process.env.JWT_SECRET);
//       //separated password from user so that we dont geti password in response
//       const { password, ...rest } = validuser._doc;

//       res
//         .status(200)
//         .cookie("access token ", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     } else {
//       //if user does not exist then we will create a new user
//       //since it  is signed in with google we need to create apassword for user and user can update it since password is require

//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);
//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
//       const newUser = new  User({
//         username:
//           name.toLowerCase().split(" ").join("") +
//           Math.random().toString(9).slice(-4),
//         email,
//         password: hashedPassword,
//         profilePicture: googlePhotoUrl,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin }, process.env.JWT_SECRET);
//       //separated password from user so that we dont geti password in response
//       const { password, ...rest } = validuser._doc;

//       res
//         .status(200)
//         .cookie("access_token ", token, {
//           httpOnly: true,
//         })
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };

export const google = async (req, res, next) => {
  const { email, name, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = user._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};