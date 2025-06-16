import { model, Schema } from "mongoose";

const likeSchema = new Schema({
    likeBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    likeOn: {
        type: Schema.Types.ObjectId,
        ref: "Video",

    }
}, { timestamps: true })

export const Like = new model("Like", likeSchema)

