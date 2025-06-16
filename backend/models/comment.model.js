import mongoose, { model, Schema } from 'mongoose'


const commentSchema = new Schema({
    commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    commentOn: {
        type: Schema.Types.ObjectId,
        ref: "Video"
    },
    text: {
        type: String,
    },
    isHidden: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export const Comment = new model("Comment", commentSchema)

