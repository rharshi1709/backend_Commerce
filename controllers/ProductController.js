import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
export const getProducts =async (req,res)=>{
    try{
         const allProducts=await Product.find()
   res.status(200).json({
    "message":"ALl product from Database",
    "data":allProducts
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
export const getCategory=  async (req,res)=>{
 try{
     const data = await Category.find()
   res.status(200).json({
      message:"Succefully fetched",
      data:data
   })
 }
 catch(err){
     res.status(500).json({
      message: "Error fetching categories",
      error: err.message,
    });
   }
}
export const getProductDetails = async (req, res) => {
    const id=req.params.id
   
try{
   const details = await Product.findOne({id:id})
   res.status(200).json({message:`your id is ${id}`,
   data:details
   })
}
catch(e){
    res.status(400).json({error:e })
}
}
export default getProductDetails;

