import express from 'express'
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { deleteAllVideos, myCommentsVideos, myLikesVideos, myVideos, uploadVideo, videoDelete, watchVideo, getAllVideos, likeOnVideo, commentOnVideo } from '../controllers/video.controller.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route("/upload").post(verifyJwt,
    upload.fields([
        { name: "videoUrl", maxCount: 1 },
        { name: "thumbnail", maxCount: 1 }
    ]),
    uploadVideo)
router.route("/videos").get(getAllVideos)
router.route("/my-videos").get(verifyJwt, myVideos)
router.route("/video/:videoId").get(verifyJwt, watchVideo)
router.route("/video/:videoId/like").post(verifyJwt, likeOnVideo)
router.route("/video/:videoId/comment").post(verifyJwt, commentOnVideo)
router.route("/my-comments-videos").get(verifyJwt, myCommentsVideos)
router.route("/my-likes-videos").get(verifyJwt, myLikesVideos)
router.route("/delete-my-video/:videoId").delete(verifyJwt, videoDelete)
router.route("/delete-all-videos").delete(verifyJwt, deleteAllVideos)

export default router


