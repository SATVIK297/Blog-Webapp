import mongoose from "mongoose";

const UserSchema  = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  }, 
  email:{
    type: String,
    required: true,
    unique:true
  }, 
  password: {
    type: String,
    required: true
  },
  profilePicture:{
    type: String,
    default: "https://st3.depositphotos.com/6050492/12654/v/950/depositphotos_126541236-stock-illustration-app-icon-template-vector.jpg"
  },
  isAdmin :{
    type:Boolean,
    default:false
  },
},
{
  timestamps: true
}
);

const User = mongoose.model("User" ,UserSchema);

export default User