const express = require('express')
const router = express.Router()
const ControllerTask = require('../controllers/task')
const cekToken = require('../middleware/cekToken')

router
    .get('/', ControllerTask.get)
    .post('/', ControllerTask.add)
    .delete('/', ControllerTask.remove)
    .put('/', ControllerTask.edit)




module.exports = router