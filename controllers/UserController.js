import User from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
export const register = async (req,res)=>{
      try{
        const {username,password,email} =req.body
        const isUser= await User.findOne({username})
        const isEmail=await User.findOne({email})
        if (isUser){
           return res.status(400).json({
                "ok":false,
                "message":"User Already Exits"
            })
        }
        if (isEmail){
           return res.status(400).json({
                "ok":false,
                "message":"Email Already Exits"
            })
        }
         const hashedPassword = await bcrypt.hash(password, 10);
        const data=await User.create({ username, email, password:hashedPassword })
     
      res.status(201).json({
        "ok":true,
        "message":"Registered Successfully...Please login to acees the features",
        "data":data
      })
      }
catch(err){
    res.status(400).json({"message":"Failed to register",
        "err":err.message
    })
}


}
export const login= async (req,res)=>{
      const {email,password}=req.body
      try{
      const existingUser= await User.findOne({email})
      if (!existingUser){
       return res.status(400).json({message:"User not registered"})
      }
      const isValidpassword= await bcrypt.compare(password,existingUser.password)
      if (!isValidpassword){
        return res.status(400).json({message:"invalid Credentials"})
      }
      const code= process.env.KEY
       const payload={
        email:existingUser.email

       }
       const jwToken = jwt.sign(payload,code)
        res.status(201).json({
        message:"JWT Token Generated Successfully",
        jwToken:jwToken
       })
    }
catch(err){
    res.status(400).json({"message":"Failed to login",
        "err":err.message
    })
}


}
