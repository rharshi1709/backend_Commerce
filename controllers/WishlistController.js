import Wishlist from "../models/WishlistModel.js";

export const addToWishlist = async (req, res) => {
  try {
    const { userId, email, product } = req.body;

    if (!userId || !email || !product) {
      return res.status(400).json({
        ok: false,
        message: "Missing required fields"
      });
    }

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId,
        email,
        products: [product]
      });
    } else {
      const productExists = wishlist.products.some(p => p.id === product.id);
      if (productExists) {
        return res.status(400).json({
          ok: false,
          message: "Product already in wishlist"
        });
      }
      wishlist.products.push(product);
      wishlist.updatedAt = Date.now();
    }

    const savedWishlist = await wishlist.save();

    res.status(201).json({
      ok: true,
      message: "Product added to wishlist",
      data: savedWishlist
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error adding to wishlist",
      error: err.message
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(200).json({
        ok: true,
        message: "Wishlist is empty",
        data: { products: [] }
      });
    }

    res.status(200).json({
      ok: true,
      message: "Wishlist fetched successfully",
      data: wishlist
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error fetching wishlist",
      error: err.message
    });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({
        ok: false,
        message: "Wishlist not found"
      });
    }

    wishlist.products = wishlist.products.filter(p => p.id !== Number(productId));
    wishlist.updatedAt = Date.now();

    const updatedWishlist = await wishlist.save();

    res.status(200).json({
      ok: true,
      message: "Product removed from wishlist",
      data: updatedWishlist
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error removing from wishlist",
      error: err.message
    });
  }
};

export const clearWishlist = async (req, res) => {
  try {
    const { userId } = req.params;

    await Wishlist.findOneAndUpdate(
      { userId },
      { products: [], updatedAt: Date.now() },
      { new: true }
    );

    res.status(200).json({
      ok: true,
      message: "Wishlist cleared successfully"
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: "Error clearing wishlist",
      error: err.message
    });
  }
};
