import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
 name:{
    type:String
 },
 phone:{
    type:Number
 },
 message:{
    type:String
 }

 
});

export default mongoose.model("Contact", contactSchema,"contact");

