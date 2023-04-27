import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    content: {
        type: String,
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;