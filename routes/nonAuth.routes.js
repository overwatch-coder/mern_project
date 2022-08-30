const express = require('express');
const router = express.Router();
const { getPosts, getSinglePost } = require('../controllers/nonAuthPostController');

router.get('/', getPosts);
router.get('/:id', getSinglePost);

module.exports = router;