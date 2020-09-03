import jsonwebtoken from "jsonwebtoken"
import e from "express"
const jwt =jsonwebtoken
const auth=(req,res,next)=>{
    const token =req.header("x-auth-token")
    if(token)
    {
     const verify=jwt.verify(token,"dsadsdsadafass");
     if (verify)
     {
         req.user=verify.id;
         next();
     }
     else{
         res.status(401).json("Access Denied")
     }
    }
    else{
        res.status(401).json("Access Denied")
    }
}
export default auth