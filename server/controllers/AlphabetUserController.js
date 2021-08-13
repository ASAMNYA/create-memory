import AlphabetUserModel from '../models/AlphabetUserModel.js';

export const saveUserData = async(req,res)=>{
    const post =req.body
    const newAlphabetUser=new AlphabetUserModel(post)
    try{
        await newAlphabetUser.save()
        res.status(201).json(newAlphabetUser)
    }catch(error){
        res.status(409).json({message:error})
    }
}