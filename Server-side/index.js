import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';

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
app.listen(3000,()=>{
  console.log("server is running");
})