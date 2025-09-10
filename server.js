import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './routes/Routes.js'
import Product from './models/ProductModel.js'
import fs from "fs";

const products = JSON.parse(fs.readFileSync("./products.json", "utf-8"));


const app =express()
app.use(cors())
dotenv.config()

app.use(express.json())
app.use('/api',router)
const URI= process.env.URI
const PORT=process.env.PORT
mongoose.connect(URI)
.then(async ()=>{
    console.log("Successfully Connected to DB")
    app.listen(PORT,()=>{
        console.log(`Server Running on port no ${PORT}`)
    })
})
.catch((err)=>{
    console.log(err)
})
