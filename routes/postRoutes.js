const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// --- API Endpoints ---

// 1. CREATE Post (POST /api/posts)
router.post('/', async (req, res) => {
    try {
        const { userId, content } = req.body;
        const newPost = new Post({ 
            userId: userId || '60c728b7f1981e0015b6d5f2', // Placeholder User ID
            content 
        });
        const post = await newPost.save();
        res.status(201).json({ msg: 'Post created successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. GET and SORT Posts (GET /api/posts?sort=...)
// Available sorts: 'latest' (default) or 'popular'
router.get('/', async (req, res) => {
    try {
        // Get 'sort' parameter from the query string, defaulting to 'latest'
        const { sort = 'latest' } = req.query; 
        let posts;

        if (sort.toLowerCase() === 'popular') {
            // Sort by likesCount (descending) then by creation date
            posts = await Post.find().sort({ likesCount: -1, createdAt: -1 });
        } else {
            // Default (latest): Sort by the last updated time (updatedAt)
            posts = await Post.find().sort({ updatedAt: -1, createdAt: -1 });
        }

        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. LIKE/UNLIKE a Post (PUT /api/posts/like/:id) 
router.put('/like/:id', async (req, res) => {
    try {
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { likesCount: 1 } }, // Atomic Increment operation
            { new: true } // Returns the updated document
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json({ msg: 'Post liked successfully', likes: post.likesCount, post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. UPDATE Post content (PUT /api/posts/:id)
router.put('/:id', async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findByIdAndUpdate(
            req.params.id,
            { content, updatedAt: Date.now() }, 
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }

        res.status(200).json({ msg: 'Post updated successfully', post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;