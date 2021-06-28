const express = require('express')
const downloadRouter = express.Router()
const {GET} = require('./controller')

downloadRouter.route('/downloads')
    .get(GET)

module.exports = downloadRouter

