// import jwt from "jsonwebtoken";
// import cookieParser from 'cookie-parser';
// import mongoose from "mongoose";
// import express from "express";

// const app = express(); 

// const dbConnection = async ()=>{
//   try{
//     await mongoose.connect(process.env.MONGODB_URI);

//     console.log("DB connection established");
//   }catch(error){
//     console.log("DB Error: "+ error);
//   }
// };

// export default dbConnection;

// export const createJWT = (res, userId) =>{
//   const token = jwt.sign({userId}, process.env.JWT_SECRET,{
//     expiresIn: "1d",
//   });
//   app.use(cookieParser());

//   res.cookie("token", token, {httpOnly: true, secure: process.env.NODE_ENV !== "development", sameSite: "strick", maxAge: 1 * 24 * 60 * 60 *1000});
// }

import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("DB connection established");
  } catch (error) {
    console.log("DB Error: " + error);
  }
};
export default dbConnection;
export const createJWT = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
 
  // Change sameSite from strict to none when you deploy your app
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict", 
    maxAge: 1 * 24 * 60 * 60 * 1000,
  });
};

