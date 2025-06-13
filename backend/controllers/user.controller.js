import { User } from "../models/user.model.js";
import apiError from "../utils/ApiError.js";
import apiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    const { fullName, username, email, password, avatar, coverImage, } = req.body

    //validate required fields
    if (!fullName || !username || !email || !password || !avatar) {
        return next(new apiError(400, "All fields are required"))
    }

    //check existing user or not
    const existingUserEmail = await User.findOne({ email })
    if (existingUserEmail) {
        return next(new apiError(409, "User with this email has already exist!"))
    }

    const existingUsername = await User.findOne({ username })
    if (existingUsername) {
        new apiError(407, "This username is already taken by someone!")
    }

    const user = await User.create({
        fullName,
        username,
        email,
        password,
        avatar: req.files?.avatar?.[0].path,
        coverImage: req.files?.avatar?.[0].path
    })

    const accesstoken = generateAccessToken()
    const refreshtoken = generateRefreshToken()

    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENVIRONMENT,
        sameSite: "Strict"
    }

    res.cookie("accesstoken", accesstoken, cookieOption)
    res.cookie("refreshtoken", refreshtoken, cookieOption)

    return res.status(201)
        .json(new apiResponse(201, "User registed successfully", { user, accesstoken, refreshtoken }))

})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password")
    if (!user || !(await user.comparePassword(password))) {
        return next(new apiError(201, "Invalid credentials!"))
    }

    const accesstoken = generateAccessToken()
    const refreshtoken = generateRefreshToken()

    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENVIRONMENT,
        sameSite: "Strict"
    }

    res.cookie("accessToken", accesstoken, cookieOption)
    res.cookie("refreshToken", refreshtoken, cookieOption)

    res.status(201)
        .json(new apiResponse(201, "login successful", { accesstoken, refreshtoken, user }))
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENVIRONMENT,
        sameSite: "Strict"
    }

    res.clearCookie('accesstoken', cookieOption)
    res.clearCookie('refreshtoken', cookieOption)

    return res.status(201).json(new apiResponse(201, "logout successfull!"))
})



export { registerUser, loginUser, logoutUser }