import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';

import userRoutes from './Routes/user.route.js'


dotenv.config();
const app = express();

mongoose.connect(process.env.MONGODB).then(
  ()=>{
    console.log("connected database");
  }
)
.catch(()=>{
  console.log("failed to connect");
})

app.use('/api/user' , userRoutes)


app.listen(3000,()=>{
  console.log("server is running");
})