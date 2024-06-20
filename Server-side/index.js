import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';

import userRoutes from './Routes/user.route.js'
import authRoutes from './Routes/auth.route.js'


dotenv.config();
const app = express();

app.use(express.json())

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


app.listen(3000,()=>{
  console.log("server is running");
})