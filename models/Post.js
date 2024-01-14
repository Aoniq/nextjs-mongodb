import mongoose from "mongoose";

const { Schema } = mongoose;

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    }, {timestamps: true});

    export default mongoose.models.Post || mongoose.model("Post", PostSchema);
