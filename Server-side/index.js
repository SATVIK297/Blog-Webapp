import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
import nodemailer from 'nodemailer'
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


app.post('/api/send', async (req, res) => {
  console.log('reacher');
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER,
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => { 
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully' });
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