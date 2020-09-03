import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config



const app=express()
const PORT=process.env.PORT || 9000

//MIDDLEWARE    
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.status(200).send("Started succesfully")
})
app.listen(PORT,()=>{
    console.log(`Started on port ${PORT}`)
})