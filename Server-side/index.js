import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import userRoutes from './Routes/user.route.js'
import authRoutes from './Routes/auth.route.js'
import postRoutes from './Routes/post.route.js'
import commentRoutes from './Routes/comment.route.js'

import path from 'path'
import cookieParser from 'cookie-parser';

dotenv.config();


mongoose.connect(process.env.MONGODB).then(
  ()=>{
    console.log("connected database");
  }
)
.catch(()=>{
  console.log("failed to connect");
})
const app = express();

const __dirname = path.resolve()
app.use(express.json())
app.use(cookieParser())

app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)
app.use('/api/post' , postRoutes)
app.use('/api/comment' , commentRoutes)

app.use(express.static(path.join(__dirname, '/client-side/dist')))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client-side', 'dist', 'index.html'));
});



app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error happened';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(process.env.PORT ||3000,()=>{
  console.log("server is running   ");
})