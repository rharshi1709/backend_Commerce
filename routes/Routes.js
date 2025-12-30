import express from 'express'
import { register ,login } from '../controllers/UserController.js'
import {getProducts , getCategory,getProductDetails}from '../controllers/ProductController.js'
import { createReview, deleteReview, getReviews } from '../controllers/ReviewController.js'
import { createOrder, getOrdersByUser, getOrderById } from '../controllers/OrderController.js'
import { addToWishlist, getWishlist, removeFromWishlist } from '../controllers/WishlistController.js'
import { contact } from '../controllers/ContactControllers.js'
import { createRazorpayOrder, verifyPayment } from '../controllers/PaymentController.js'

const router=express.Router()
router.post('/register',register)
router.get('/products',authMiddleware,getProducts)
router.get('/category',authMiddleware,getCategory)
router.get('/product/:id',authMiddleware,getProductDetails)
router.post('/review/:id',  authMiddleware,createReview)
router.get('/review/:id',authMiddleware,getReviews)
router.delete('/review/:id',authMiddleware,deleteReview)
router.post('/login', login)
router.post('/contact',contact)

// Payment routes
router.post('/payment/create-order', authMiddleware, createRazorpayOrder)
router.post('/payment/verify', authMiddleware, verifyPayment)

// Order routes
router.post('/order', authMiddleware, createOrder)
router.get('/orders', authMiddleware, getOrdersByUser)
router.get('/order/:id', authMiddleware, getOrderById)

// Wishlist routes
router.post('/wishlist', authMiddleware, addToWishlist)
router.get('/wishlist', authMiddleware, getWishlist)
router.delete('/wishlist/:id', authMiddleware, removeFromWishlist)

export default router