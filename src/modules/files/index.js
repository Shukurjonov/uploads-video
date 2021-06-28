const express = require('express')
const filesRoute = express.Router()
const {GET} = require('./controller')

filesRoute.route('/files')
    .get(GET)

module.exports = filesRoute