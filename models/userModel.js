import mongoose from  "mongoose"
const userschema=mongoose.Schema({
    displayName:{type:String},
    email:{type:String,required:true},
    password:{type:String,required:true,minlength:5}
})
export default mongoose.model("User",userschema)