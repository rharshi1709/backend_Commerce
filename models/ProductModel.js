import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: {
    type: Number
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  categoryId: {
    type: String
  },
  image: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  }
});

export default mongoose.model("Product", productSchema);

