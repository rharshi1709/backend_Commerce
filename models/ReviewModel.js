import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
 review:{
    type:String
 },
 productId:{
    type:String
 }
 
});

export default mongoose.model("Review", reviewSchema,"review");

