const homeRoute = require('./home')
const registerRoute = require('./register')
const loginRoute = require('./login')
const userRoute = require('./user')
const filesRoute = require('./files')
const downloadRouter = require('./download')

module.exports = [homeRoute, registerRoute, loginRoute, userRoute, filesRoute, downloadRouter]