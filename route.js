const express = require('express')
const router = express.Router()
const { controller } = require('./controller')

router.post('/create', controller.createController)
router.get('/results', controller.resultsController)
router.get('/result/:id', controller.resultController)

module.exports = router
