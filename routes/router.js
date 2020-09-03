import express from "express"
import User from "../models/userModel.js"
const router=express.Router();

router.get("/",(req,res)=>{
    res.status(200).json("Successfully routing")
})
router.post("/createpost",(req,res)=>{
    const post =req.body;
    User.create(post,(err,data)=>{
        if(err){
            res.status(200).json(`Error occurred in entering data due to ${err}`);
        }
        else{
            res.status(200).json(`Successfully entered data ${data}`)
        }
    })
})
router.get("/viewpost",(req,res)=>{
    User.find({},(err,data)=>{
        if (data)
        {
            res.status(200).json(data)
        }
    })
})
export default router