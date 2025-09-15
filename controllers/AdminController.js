import Admin from '../models/AdminModel.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt from 'jsonwebtoken'
export const Adminregister = async (req,res)=>{
      try{
        const {username,password} =req.body
        const isAdmin= await Admin.findOne({username})
        
        if (isAdmin){
           return res.status(400).json({
                "ok":false,
                "message":"Admin Already Exits"
            })
        }
       
         const hashedPassword = await bcrypt.hash(password, 10);
        const data=await new Admin({ username, email, password:hashedPassword })
      const savedData = await data.save();
      res.status(201).json({
        "ok":true,
        "message":"Registered Successfully...Please login to acees the features",
        "data":savedData
      })
      }
catch(err){
    res.status(400).json({"message":"Failed to register",
        "err":err.message
    })
}


}
export const Adminlogin= async (req,res)=>{
      const {username,password}=req.body
      try{
      const existingAdmin= await Admin.findOne({username})
      if (!existingAdmin){
       return res.status(400).json({message:"Admin not registered"})
      }
      const isValidpassword= await bcrypt.compare(password,existingUser.password)
      if (!isValidpassword){
        return res.status(400).json({message:"invalid Credentials"})
      }
      const code= process.env.KEY
       const payload={
          username:existingAdmin.username

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
