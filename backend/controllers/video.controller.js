import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { Video } from '../models/video.model.js'
import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";



const uploadVideo = asyncHandler(async (req, res, next) => {
    try {
        //Upload Video by taking title, desciption, videoUrl, thumbnail
        const { title, description } = req.body
        const videoUrl = req.files?.videoUrl?.[0]?.path
        const thumbnail = req.files?.thumbnail?.[0]?.path

        //Check any field is empty or not
        if (!title || !videoUrl || !description || !thumbnail) {
            return next(new apiError(400, "title, videourl, description, and thumbnail is required"))
        }

        //Upload video thumbnail and video on cloudinary ang get url
        const videoUpload = await uploadOnCloudinary(videoUrl)
        const thumbnailUpload = await uploadOnCloudinary(thumbnail)

        if (!videoUpload || !thumbnailUpload) {
            return next(new apiError(500, "Cloudinary upload failed"))
        }

        //create video
        const video = await Video.create({
            title,
            description,
            videoUrl: videoUpload.secure_url,
            thumbnail: thumbnailUpload.secure_url,
            owner: req.user
        })

        console.log("Title: ", video.title)
        console.log("Description: ", video.description)
        console.log("VideoUrl: ", video.videoUrl)
        console.log("Thumbnail: ", video.thumbnail)
        console.log("owner: ", video.owner)

        return res.status(201).json(new apiResponse(201, video, "video uploaded"))
    } catch (error) {
        next(error)
    }
})

const getAllVideos = asyncHandler(async (req, res, next) => {
    try {
        const videos = await Video.find({})
            .populate("owner", "fullName avatar")
            .exec()

        //If not video then send an error
        if (!videos.length) {
            return next(new apiError(404, "There is no videos"))
        }
        console.log("videos: ", videos.length)
        return res.status(200).json(new apiResponse(200, videos, "Videos fetch successfully!"))

    } catch (error) {
        next(error)
    }
})

const myVideos = asyncHandler(async (req, res, next) => {
    try {
        const videos = await Video.find({ owner: req.user }).populate("owner", "username")

        if (!videos.length) {
            next(404, "You don't upload any video")
        }

        console.log("Your videos length is: ", videos.length)
        res.status(200)
            .json(new apiResponse(200, videos, "Your videos fetch successfull!"))
    } catch (error) {
        next(error)
    }
})

const watchVideo = asyncHandler(async (req, res, next) => {
    const { videoId } = req.params;
    const userId = req.user

    if (!videoId) {
        return next(new apiError(404, "video not found"))
    }

    //find video by id 
    const video = await Video.findById(videoId).populate("owner", "username avatar")
    if (!video) {
        return next(new apiError(404, "Video not found"))
    }
    //update video count when any one watch and save
    video.views = (video.views + 1) 
    await video.save()

    //show related videos apart of watching video
    const relatedVideos = await Video.find({ _id: { $ne: videoId } })
        .limit(5)
        .select("title thumbanil owner")
        .populate("owner", "username")

    if (!relatedVideos) {
        return next(new apiError(404, "related video not found"))
    }

    // load comments and like on current watching video
    const comments = await Comment.find({
        commentOn: videoId,
        $or: [
            { isHidden: false },
            { commentBy: video.owner._id }
        ]
    })
        .populate("commentBy", "username, avatar")
        .sort({ createdAt: -1 })


    const likesCount = await Like.countDocuments({ likeOn: videoId })

    const likeByUser = await Like.exists({ likeOn: videoId, likeBy: userId })

    res.status(200)
        .json(new apiResponse(200, { video, relatedVideos, comments, likesCount, likeByUser: !!likeByUser }, "Video and related videos fetch successfully"))
})

const myCommentsVideos = asyncHandler(async (req, res, next) => {
    try {

        const comments = await Comment.find({ commentBy: req.user }).select("commentOn")
            .populate("commentOn", 'title thumbnail')
            .populate("commentBy", "username")

        if (!comments.length) {
            return res.status(404)
                .json(new apiResponse(404, null, "No videos found"))
        }

        const videoIds = [...new Set(comments.map(c => c.commentOn.toString()))]

        const videos = await Video.find({ _id: { $in: videoIds } })

        res.status(200)
            .json(new apiResponse(200, videos, "Fetched all videos you commented on."))
    } catch (error) {
        next(error)
    }
})

const myLikesVideos = asyncHandler(async (req, res, next) => {
    try {
        const likes = await Like.find({ likeBy: req.user }).select("likeOn")
            .populate("likeOn", "title, thumbnail")
            .populate("likeBy", "username")

        if (!likes.length) {
            return res.status(404)
                .json(new apiResponse(404, null, "No liked video"))
        }

        const videoIds = [...new Set(likes.map((l) => l.likeOn.toString()))]

        const videos = await Video.find({ _id: { $in: videoIds } })

        res.status(200)
            .json(new apiResponse(200, videos, "Fetched all videos you likes on."))
    } catch (error) {
        next(error)
    }
})

const videoDelete = asyncHandler(async (req, res, next) => {
    try {
        const { videoId } = req.params;

        //find video by id
        const video = await Video.findById(videoId)

        if (!video) {
            return res.status(404)
                .json(new apiResponse(404, null, "Video not found"))
        }
        console.log("video owner: ", video.owner.toString())
        console.log("req user: ", req.user._id.toString())

        if (video.owner.toString() !== req.user._id.toString()) {
            return next(new apiError(403, "You are not authorized to delete this video"))
        }
        //delete video
        const deleteResult = await video.deleteOne()

        res.status(200)
            .json(new apiResponse(200, deleteResult, "Video deleted successfully"))
    } catch (error) {
        next(error)
    }
})

const deleteAllVideos = asyncHandler(async (req, res, next) => {
    try {
        const userId = req.user

        const videos = await Video.find({ owner: userId })

        if (!videos.length) {
            return res.status(404)
                .json(new apiResponse(404, null, "Videos not found"))
        }

        //deleted all videos

        const deletedVideos = await videos.deleteMany({ owner: userId })

        res.status(200)
            .json(new apiResponse(200, deletedVideos, "All your videos are deleted successfull!"))
    } catch (error) {
        next(error)
    }
})

export { uploadVideo, myVideos, videoDelete, deleteAllVideos, myCommentsVideos, myLikesVideos, watchVideo, getAllVideos }