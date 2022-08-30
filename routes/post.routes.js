const express = require('express');
const router = express.Router();
const { createPost, getPosts, getSinglePost, updatePost, deletePost} = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware');

router.use(verifyToken);
router.get('/', getPosts);
router.get('/:id', getSinglePost);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

module.exports = router;