const Post = require('../models/post');

const getPosts = async (req, res) => {
    const user_id = req.user_id;
    try{;
        const posts = await Post.find({ user_id }).sort({createdAt: -1});
        if(posts.length === 0) {
            return res.status(200).send({
                message: 'No posts found'
            });
        }
        res.status(200).json(posts);
    }catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

const createPost = async (req, res) => {
    const user_id = req.user_id;
    const { title, description, author } = req.body;
    // console.log({file: req.file});
    const post = new Post({
        title,
        description,
        author,
        user_id
    });

    try{
       const savedPost = await post.save();
        res.status(201).json(savedPost);
    }catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

const getSinglePost = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user_id
    try {
        const post = await Post.find({$and: [{_id: id}, {user_id}]});
        if(!post){
            return res.status(200).json({message: "Post not found"});
        }

        if(post.length <1){
            return res.status(200).json({message: 'No posts found'});
        }

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

const updatePost = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user_id;
    const { title, description, author } = req.body;
    try {
        const post = await Post.findOneAndUpdate(
            {$and: [{_id: id}, {user_id}]}, 
            {title, description, author}, 
            {new: true}
        );

        if(!post){
            return res.status(403).json({message: "You are not authorized to update post"});
        }

        return res.status(200).json(post);

    } catch (error) {
        return res.status(500).json({message: error.message})
    }    
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user_id;
    try {
        await Post.findOneAndDelete({$and: [{_id: id}, {user_id}]});

        return res.status(200).json({message: "Post deleted successfully"});

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}




module.exports = {
    getPosts,
    createPost,
    getSinglePost, 
    updatePost, 
    deletePost
}