const path = require('path')

const getAllFiles = () => require(path.join(process.cwd(), 'src', 'database', 'files.json'))

module.exports = {getAllFiles}