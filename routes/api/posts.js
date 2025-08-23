const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const Post = require('../../models/Post')
const User = require('../../models/User')

// @route   POST api/posts
// @desc    Create a post
// @access  Private
router.post(
	'/',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const user = await User.findById(req.user.id).select('-password')
			const newPost = new Post({
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			})

			const post = await newPost.save()
			res.json(post)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route   GET api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
	try {
		const posts = await Post.find().sort({ date: -1 })
		res.json(posts)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   GET api/posts/user/:user_id
// @desc    Get all posts by a specific user
// @access  Public
router.get('/user/:user_id', async (req, res) => {
	try {
		const posts = await Post.find({ user: req.params.user_id }).sort({
			date: -1,
		})
		if (!posts.length)
			return res.status(404).json({ msg: 'No posts found for this user' })
		res.json(posts)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// have to do delete

// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  Private
router.put('/like/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)

		if (!post) return res.status(404).json({ msg: 'Post not found' })

		if (post.likes.some((like) => like.user.toString() === req.user.id))
			return res.status(400).json({ msg: 'Post already liked' })

		post.likes.unshift({ user: req.user.id })
		await post.save()
		res.json(post.likes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   PUT api/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put('/unlike/:id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) return res.status(404).json({ msg: 'Post not found' })

		const removeIndex = post.likes.findIndex(
			(like) => like.user.toString() === req.user.id
		)
		if (removeIndex === -1)
			return res.status(400).json({ msg: 'Post has not yet been liked' })

		post.likes.splice(removeIndex, 1)
		await post.save()
		res.json(post.likes)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

// @route   POST api/posts/comment/:id
// @desc    Add a comment to a post
// @access  Private
router.post(
	'/comment/:id',
	[auth, [check('text', 'Text is required').not().isEmpty()]],
	async (req, res) => {
		const errors = validationResult(req)
		if (!errors.isEmpty())
			return res.status(400).json({ errors: errors.array() })

		try {
			const user = await User.findById(req.user.id).select('-password')
			const post = await Post.findById(req.params.id)
			if (!post) return res.status(404).json({ msg: 'Post not found' })

			const newComment = {
				text: req.body.text,
				name: user.name,
				avatar: user.avatar,
				user: req.user.id,
			}

			post.comments.unshift(newComment)
			await post.save()
			res.json(post.comments)
		} catch (err) {
			console.error(err.message)
			res.status(500).send('Server Error')
		}
	}
)

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete a comment from a post
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
	try {
		const post = await Post.findById(req.params.id)
		if (!post) return res.status(404).json({ msg: 'Post not found' })

		const comment = post.comments.find((c) => c.id === req.params.comment_id)
		if (!comment) return res.status(404).json({ msg: 'Comment does not exist' })

		if (comment.user.toString() !== req.user.id)
			return res.status(401).json({ msg: 'User not authorized' })

		post.comments = post.comments.filter((c) => c.id !== req.params.comment_id)
		await post.save()
		res.json(post.comments)
	} catch (err) {
		console.error(err.message)
		res.status(500).send('Server Error')
	}
})

module.exports = router
