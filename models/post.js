const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    user_id: {
        type: String,
    },
    author: {
        type: String,
        require: [true, 'Author is require']
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;