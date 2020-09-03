import express from "express"
import User from "../models/userModel.js"
import bcrypt from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import auth from "../middleware/auth.js"
const jwt=jsonwebtoken
const router=express.Router();


router.get("/",(req,res)=>{
    res.status(200).json("Successfully routing")
})
router.post("/createpost", async (req,res)=>{
    const {displayName,email,password,} =req.body;
   
   const userexists = await  User.find({email:email})
//    console.log(userexists)
   if ((userexists).length!=0)

   {
      res.status(200).json("User already exists")
       
   }
   else{
    const salt=await bcrypt.genSalt(10);
    let hashpassword=await bcrypt.hash(password,salt);
await  User.create({displayName:displayName,email:email,password:hashpassword},(err,data)=>{
     if (err) {res.status(200).json(`${err} occurred`)}
     else{
         res.status(200).json("Data added successfully ")
     }
 })
   }
   

})
router.post("/login", async (req,res)=>{
    const {email,password}=req.body;
    const user= await  User.findOne({email:email})

    try{
    if ((user).length!=0)
    { // console.log(user.password)
        const ismatch= await bcrypt.compare(password,user.password)
        const token=jwt.sign({id:user._id},"dsadsdsadafass");
        
        if (ismatch)
        {   
            res.status(200).json({
                "token":token,
                "user":{
                 "id":user._id,
                "displayName":user.displayName,
                "password":user.password
                }
            })
        }
        else{
            res.status(200).json("Invalid creditionals")
        }
    }
    else{
        res.status(200).send("User does not exists")
    }
}
catch(error){
    res.status(200).json(` Error occured ${error}`)
}
})
router.get("/viewpost",(req,res)=>{
    User.find({},(err,data)=>{
        if (data)
        {
            res.status(200).json(data)
        }
    })
})
router.delete("/delete",auth,async (req,res)=>{
    try{
      const deleteuser=await User.findByIdAndDelete(req.user);
      res.status(200).json(`Deleted User ${deleteuser}`)
    }
    catch(error)
    {
        res.status(200).json(`Error ${error} occured`)
    }
})
router.post("/checktoken",(req,res)=>{
    const token =req.header("x-auth-token");
    const verify =jwt.verify(token,"dsadsdsadafass");
    if (verify)
    {
        res.status(200).send("Token verified")
    }
})
export default router