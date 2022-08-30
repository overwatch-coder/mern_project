const Post = require('../models/post');
const User = require('../models/user');

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).sort({createdAt: 'desc'});
        if(!posts){
            return res.status(404).json({message: 'No posts found'});
        } 

        return res.status(200).json(posts);

    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

const getSinglePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById({_id: id});
        if(!post){
            return res.status(404).json({message: 'No posts found'});
        }

        return res.status(200).json(post);
        
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

module.exports = {
    getPosts, 
    getSinglePost
}