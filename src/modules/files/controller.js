const path = require('path')
const {getAllFiles} = require('./model')

const GET = (req, res) => {
    res.status(200).json(getAllFiles())
}

module.exports = {GET}