import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";


const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { fullName, username, email, password } = req.body
        const { avatar, coverImage } = req.files

        console.log("req files ", req.files)
        console.log("req body ", req.body)

        /*
        validate required fields
        if (!fullName
            || !username
            || !email
            || !password
            || !req.files?.avatar?.[0]
            || !req.files?.coverImage?.[0]) {
            return next(new apiError(400, "All fields are required"))
        }
            */

        if (!fullName) {
            console.log("fullName", fullName)
        }
        if (!username) {
            console.log("username", username)
        }
        if (!email) { console.log("email", email) }
        if (!password) { console.log("password", password) }
        if (!req.files?.avatar?.[0]) { console.log("avatar", req.files?.avatar[0]) }
        if (!req.files?.coverImage[0]) { console.log("coverImage", req.files?.coverImage[0]) }

        //Check user email is existing or not

        const existingUserEmail = await User.findOne({ email });
        if (existingUserEmail) {
            return next(new apiError(409, "User with this email has already exist!"));
        }

        //Check username is exist or not

        const existingUsername = await User.findOne({ username })
        if (existingUsername) {
            return next(new apiError(407, "This username is already taken by someone!"))
        }

        //Create new user

        const user = await User.create({
            fullName,
            username,
            email,
            password,
            avatar: req.files?.avatar?.[0].path,
            coverImage: req.files?.coverImage?.[0].path
        })

        //Genereate accessToken and refreshToken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // send cookieOption
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "Strict"
        }

        res.cookie("accessToken", accessToken, cookieOption)
        res.cookie("refreshToken", refreshToken, cookieOption)


        console.log(user.fullName, user.username, user.email, user.password, user.avatar, user.coverImage)
        return res.status(201)
            .json(new apiResponse(201, "User registed successfully", { user, accessToken, refreshToken }))
    } catch (error) {
        next(error)
    }

})

const loginUser = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log("login request body: ", req.body)

        //Get user with email and password
        const user = await User.findOne({ email }).select("+password")

        //compare user and actual password
        if (!user || !(await user.isPasswordCorrect(password))) {
            return next(new apiError(401, "Invalid credentials!"))
        }

        console.log(user.fullName, user.username, user.email, user.password, user.avatar, user.coverImage)

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV,
            sameSite: "Strict"
        }

        res.cookie("accessToken", accessToken, cookieOption)
        res.cookie("refreshToken", refreshToken, cookieOption)

        res.status(201)
            .json(new apiResponse(201, "login successful", { accessToken, refreshToken, user }))
    } catch (error) {
        next(error)
    }
})


const getUserProfile = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findById(req.user).select("-password")
        if (!user) return next(new apiError(404, "User not found"))

        console.log("user ", user)

        return res.status(200).json(new apiResponse(200, user, "User profile fetch"))

    } catch (error) {
        next(error)
    }
})

const updateUserProfile = asyncHandler(async (req, res, next) => {
    try {
        const { email, username, avatar, coverImage } = req.body

        const updateUser = await User.findByIdAndUpdate(
            req.user,
            {
                $set: {
                    ...(email && { email }),
                    ...(username && { username }),
                    ...(avatar && { avatar }),
                    ...(coverImage && { coverImage }),
                }
            },
            { new: true, runValidators: true }
        ).select("-password")

        // if user is not updated by any reasons send an error
        if (!updateUser) return next(new apiError(404, "User not found"))
        console.log("Updated user ", updateUser)

        return res.status(200).json(new apiResponse(200, updateUser, "User profile updated"))
    } catch (error) {
        next(error)
    }
})


const logoutUser = asyncHandler(async (req, res) => {
    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "Strict"
    }

    res.clearCookie('accesstoken', cookieOption)
    res.clearCookie('refreshtoken', cookieOption)


    return res.status(201).json(new apiResponse(201, "logout successfull!"))
})


export { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile }