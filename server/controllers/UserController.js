import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../models/UserModel.js'

dotenv.config()

export const signin=async(req,res)=>{
    const {email,password} =req.body
    try {
        const existUser=await UserModel.findOne({email})
        if(!existUser)
        return res.status(404).json({message:'User Does not exist'})
        const isPasswordCorrect=await bcrypt.compare(password,existUser.password)
        if(!isPasswordCorrect)
        return res.status(400).json({message:'Credential mismatched'})
        const token=jwt.sign({email:existUser.email,id:existUser._id},process.env.plaid,{expiresIn:'1h'})
        res.status(200).json({result:existUser,token})
    } catch (error) {
        res.status(500).json({message:'oh oh ow'})
    }
}
export const signup=async(req,res)=>{
    const{email,password,confirmPassword,firstName,lastName}=req.body
    try {
        const existingUser=await UserModel.findOne({email})
        if(existingUser)
        return res.status(400).json({message:'User already exist'})
        if(password !== confirmPassword)
        return res.status(400).json({message:'Password mismatched'})
        const hashedPassword=await bcrypt.hash(password,12)
        const result=await UserModel.create({email,password:hashedPassword,name:`${firstName} ${lastName}`})
        const token=jwt.sign({email:result.email,id:result._id},process.env.plaid,{expiresIn:'1h'})
        res.status(200).json({result:result,token})

    } catch (error) {
        res.status(500).json({message:'oh oh ow'})
        
    }
}   