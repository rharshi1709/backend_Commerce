import Review from "../models/ReviewModel.js"
export const createReview =async (req,res)=>{
        const productId=req.params.id
        const {review}=req.body
    try{
        const data= await Review.create({review,productId})
       res.status(201).json({
        "message":"Review created successfully",
        "data":data
       })
   }
   catch(err){
    console.log(err)
      res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
   }
}
export const getReviews = async (req,res)=>{
    const productId=req.params.id
    try{
        const reviews= await Review.find({productId:productId})
       res.status(200).json({   
        "message":"Reviews fetched successfully",
        "data":reviews
       })
   }
    catch(err){
    console.log(err)
        res.status(500).json({
        message: "Server Error",
        error: err.message,
        });


    }}
export const deleteReview = async (req,res)=>{
    const reviewId=req.params.id
    try{
        await Review.findByIdAndDelete(reviewId)
       res.status(200).json({
        message: "Review deleted successfully",
      });
   }
   catch(err){
    console.log(err)
      res.status(500).json({
      message: "Server Error",
      error: err.message,
    });
   }
}