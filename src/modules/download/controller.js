const path = require('path')

const GET = (req, res) => {
    res.download(path.join(process.cwd(), "src", "uploads", 'files', req.query.fileName))
}


module.exports = {GET}