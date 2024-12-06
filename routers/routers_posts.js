const express = require("express")
const router = express.Router()

const controllers_posts = require("../controllers/controllers_posts.js")

router.get('/', controllers_posts.index)
router.get('/:id', controllers_posts.show)
router.delete('/:id', controllers_posts.destroy)

module.exports = router

