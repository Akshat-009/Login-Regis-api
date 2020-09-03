import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from 'dotenv'
import User from "./models/userModel.js"
import router from "./routes/router.js"
dotenv.config()



const app=express()
const PORT=process.env.PORT || 9000


mongoose.connect(process.env.MONGOOSE_CONNECT_URL,{useUnifiedTopology:true,useNewUrlParser:true,useCreateIndex:true},(err)=>{
    if (err)
    {
        throw err
    }
    else{console.log("successfully connected")}
})
//MIDDLEWARE    
app.use(express.json())
app.use(cors())

app.use("/",router)
app.use("/createpost",router)
app.use("/viewpost",router)
app.use("/login",router)
app.listen(PORT,()=>{
    console.log(`Started on port ${PORT}`)
})