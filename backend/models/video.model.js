import mongoose, { Schema } from 'mongoose'

const videoSchema = new mongoose.Schema({
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        maxLength: [100, "Title should less than or equal to 100"]
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublish: {
        type: String,
        default: ["public"],
    },
    comments: [
        {
            type: Schema.types.ObjectId,
            ref: "User",
        },
    ],
    likes: [
        {
            type: Schema.types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true })

export const Video = new mongoose.model("Video", videoSchema)