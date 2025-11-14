import express from 'express'
import { register ,login } from '../controllers/UserController.js'
import {getProducts , getCategory,getProductDetails}from '../controllers/ProductController.js'
import { createReview, deleteReview, getReviews } from '../controllers/ReviewController.js'
// import { createOrder, getOrdersByUser, getOrderById, updateOrderStatus } from '../controllers/OrderController.js'
// import { addToWishlist, getWishlist, removeFromWishlist, clearWishlist } from '../controllers/WishlistController.js'
import { contact } from '../controllers/ContactControllers.js'



const router=express.Router()
router.post('/register', register)
router.get('/products',getProducts)
router.get('/category',getCategory)
router.get('/product/:id',getProductDetails)
router.post('/review/:id',createReview)
router.get('/review/:id',getReviews)
router.delete('/review/:id',deleteReview)
router.post('/login', login)
router.post('/contact',contact)
// router.post('/order', createOrder)
// router.get('/orders/:email', getOrdersByUser)
// router.get('/order/:orderId', getOrderById)
// router.patch('/order/:orderId', updateOrderStatus)

// router.post('/wishlist', addToWishlist)
// router.get('/wishlist/:userId', getWishlist)
// router.delete('/wishlist/:userId/:productId', removeFromWishlist)
// router.delete('/wishlist/:userId', clearWishlist)

export default router