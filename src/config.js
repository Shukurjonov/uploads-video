const ip = require('./lib/getIp')

const host = ip({internal: false})
const PORT = process.env.PORT || 5000

module.exports = {host, PORT}

