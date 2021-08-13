import mongoose from 'mongoose'

const alphabetSchema=mongoose.Schema({
   email:String,
   familyName:String,
   givenName:String,
    googleId:String,
    imageUrl:String,
    name:String,
   created_at:{
       type:Date,
       default:new Date()
   }
})

const AlphabetUserModel=mongoose.model('AlphabetUserModel',alphabetSchema)
export default AlphabetUserModel