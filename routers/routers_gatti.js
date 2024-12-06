const express = require("express")
const router = express.Router()

const controllers_gatti = require ("../controllers/controllers_gatti.js")

router.get('/', controllers_gatti.index)
router.get('/:nome', controllers_gatti.show)

router.post("/", controllers_gatti.store)

router.put('/:nome', controllers_gatti.update)

router.delete('/:nome', controllers_gatti.destroy)

module.exports = router

