const exporess = require('express')

const baseController = require('../controllers/base.controller')

baseRoutes = exporess.Router()
baseRoutes.get('/', baseController.getBase)

module.exports = baseRoutes