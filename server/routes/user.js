const express = require('express')
const router = express.Router()
const ControllerUser = require('../controllers/user')

router
    .get('/', ControllerUser.get)
    .post('/', ControllerUser.add)

module.exports = router