import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv'

const app=express()
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
dotenv.config()
app.use(cors())

// const URL='mongodb+srv://pozastha:marcus007@ivoryigor.d3mrv.mongodb.net/IGORTEST?retryWrites=true&w=majority'
const PORT=process.env.PORT || 5000

mongoose.connect(process.env.URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>console.log(`Server is running on PORT: ${PORT}`)))
.catch((error)=>console.log(error.message))
app.use('/posts',postRoutes)

mongoose.set('useFindAndModify',false)