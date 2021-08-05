import mongoose from 'mongoose'
import PostModel from '../models/Post.js'

export const getPosts=async(req,res)=>{
    try{
        const posts=await PostModel.find()
        res.status(200).json(posts)
    }catch(error){
        res.status(404).json({message:error.message})
    }
   
}

export const createPost = async(req,res)=>{
    const post =req.body
    const newPost=new PostModel(post)
    try{
        await newPost.save()
        res.status(201).json(newPost)
    }catch(error){
        res.status(409).json({message:error.message})
    }
}

export const updatePost = async(req,res)=>{
    const {id:_id}=req.params
    const post=req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post Found')
    const updatedPost= await PostModel.findByIdAndUpdate(_id,{...post,_id},{new:true})
    res.json(updatedPost)

}
export const deletePost =async(req,res)=>{
    const {id} =req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Found')
    await PostModel.findByIdAndRemove(id)
    res.json({message:'Post Deletetion Succesful'})

}
export const likePost=async(req,res)=>{
    const {id}= req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No Post Found')
    const post=await PostModel.findById(id)
    const likedPost=await PostModel.findByIdAndUpdate(id,{likeCount:post.likeCount + 1},{new:true})
    res.json(likedPost)
}