import mongoose from 'mongoose'

const postSchema=mongoose.Schema({
   title:String,
   message:String,
   creator:String,
   tags:[String],
   selectedFile:String,
   likeCount:{
       type:Number,
       default:0
   },
   created_at:{
       type:Date,
       default:new Date()
   }
})

const PostModel=mongoose.model('PostModel',postSchema)
export default PostModel