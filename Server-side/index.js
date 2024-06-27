import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';

import userRoutes from './Routes/user.route.js'
import authRoutes from './Routes/auth.route.js'
import postRoutes from './Routes/post.route.js'
import commentRoutes from './Routes/comment.route.js'

import cookieParser from 'cookie-parser';


dotenv.config();
const app = express();

app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGODB).then(
  ()=>{
    console.log("connected database");
  }
)
.catch(()=>{
  console.log("failed to connect");
})


app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/comment' , commentRoutes)

// Catch 404 and respond with JSON
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

//error handling middleware for any req,res error 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error happened';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(3000,()=>{
  console.log("server is running   ");
})