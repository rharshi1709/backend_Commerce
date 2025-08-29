import express from 'express'
import { register ,login } from '../controllers/UserController.js'
import {getProducts , getCategory,getProductDetails}from '../controllers/ProductController.js'

const router=express.Router()
router.post('/register',register)
router.get('/products',getProducts)
router.get('/category',getCategory)
router.get('/product/:id',getProductDetails)
router.post('/login',login)
export default router