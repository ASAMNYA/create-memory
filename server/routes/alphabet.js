import express from 'express'
import {saveUserData} from '../controllers/AlphabetUserController.js'

const router =express.Router()
router.post('/',saveUserData)

export default router