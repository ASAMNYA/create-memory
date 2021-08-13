import mongoose from 'mongoose'

const userSchema=mongoose.Schema({
    
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    id:{type:String},
   created_at:{
       type:Date,
       default:new Date()
   }
})

const UserModel=mongoose.model('UserModel',userSchema)
export default UserModel