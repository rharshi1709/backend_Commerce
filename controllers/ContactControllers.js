import Contact from "../models/ContactModel.js";


export const contact = async (req,res)=>{
      try{
        const {name, phone,message} =req.body
      
        const data=await Contact.create({ name,phone, message })
      res.status(201).json({
        "ok":true,
        "message":"Thank you..! for contacting us, wait for the reply",
      })
      }
catch(err){
    res.status(400).json({"message":"Something went wrong",
        "err":err.message
    })
}


}