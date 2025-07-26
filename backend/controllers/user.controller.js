import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"


const refreshToken = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid refresh token" });

        const accessToken = jwt.sign(
            { id: user.id, username: user.username, email: user.email},
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY } // or whatever expiration you prefer
        );

        res.json({ accessToken });
    });
})

const registerUser = asyncHandler(async (req, res, next) => {
    try {
        const { fullName, username, email, password } = req.body
        const { avatar, coverImage } = req.files

        // console.log("req files ", req.files)
        // console.log("req body ", req.body)

        const avatarPath = avatar?.[0]?.path;
        const coverImagePath = coverImage?.[0]?.path


        if (!fullName || !username || !email || !password || !avatarPath || !coverImagePath) {
            return next(new apiError(400, "All fields fullName, username, email, password, avatar, coverImage must be required"))
        }

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

        // cover image and avatar upload on cloudinary
        const avatarUpload = await uploadOnCloudinary(avatarPath)
        const coverImageupload = await uploadOnCloudinary(coverImagePath)

        if (!avatarUpload) {
            return next(new apiError(500, "Cloudinary avatar upload failed"))
        }

        if(!coverImageupload){
            return next(new apiError(500, "Cloudinary coverImge upload failed"))
        }

        //Create new user

        const user = await User.create({
            fullName,
            username,
            email,
            password,
            avatar: avatarUpload.secure_url,
            coverImage: coverImageupload.secure_url
        })

        //Genereate accessToken and refreshToken
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // send cookieOption
        const cookieOption = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        }

        res.cookie("accessToken", accessToken, cookieOption)
        res.cookie("refreshToken", refreshToken, cookieOption)


        // console.log(user.fullName, user.username, user.email, user.password, user.avatarUpload, user.coverImageupload)
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
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000,
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

        user.views += 1;
        await user.save()

        return res.status(200).json(new apiResponse(201, user, "User profile fetch"))

    } catch (error) {
        next(error)
    }
})

const updateUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const { fullName } = req.body?.fullName || "Nothinng";
    const avatarFile = req.files?.avatar?.[0];
    const coverImageFile = req.files?.coverImage?.[0];

    const user = await User.findById(req.user);
    if (!user) return next(new apiError(404, "User not found"));

    if (fullName) user.fullName = fullName;

    if (avatarFile) {
      const avatarUpload = await uploadOnCloudinary(avatarFile.path);
      if (!avatarUpload?.secure_url) return next(new apiError(500, "Avatar upload failed"));
      user.avatar = avatarUpload.secure_url;
    }

    if (coverImageFile) {
      const coverImageUpload = await uploadOnCloudinary(coverImageFile.path);
      if (!coverImageUpload?.secure_url) return next(new apiError(500, "Cover image upload failed"));
      user.coverImage = coverImageUpload.secure_url;
    }

    await user.save();

    return res.status(200).json(
      new apiResponse(200, user, "User profile updated")
    );
  } catch (error) {
    console.error("❌ Error in updateUserProfile:", error);
    return next(error);
  }
});



const logoutUser = asyncHandler(async (req, res) => {
    const cookieOption = {
        httpOnly: true,
        secure: process.env.NODE_ENV,
        sameSite: "Strict"
    }

    res.clearCookie('accessToken', cookieOption)
    res.clearCookie('refreshToken', cookieOption)


    return res.status(201).json(new apiResponse(201, "logout successfull!"))
})


export { refreshToken, registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile }