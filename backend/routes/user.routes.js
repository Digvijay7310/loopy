import express from 'express'
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile } from '../controllers/user.controller.js'
import { verifyJwt } from '../middlewares/auth.middleware.js'
import { upload } from '../middlewares/multer.middleware.js'


const router = express.Router()

// console.log('upload:', upload)
// console.log('typeof upload.fields:', typeof upload.fields)

// console.log('registerUser:', registerUser)
// console.log('typeof registerUser:', typeof registerUser)


router.route("/register").post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1
        },
        {
            name: 'coverImage',
            maxCount: 1
        }
    ]), registerUser)

router.route("/login").post(loginUser)
router.route("/profile").get(verifyJwt, getUserProfile)
router.route("/update-profile").put(verifyJwt, updateUserProfile)
router.route("/logout").post(verifyJwt, logoutUser)




export default router