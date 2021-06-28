const path = require('path')
const uniqueId = require('./../../lib/mhid')
const {addFiles} = require('./model')

const GET = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'src', 'views', 'index.html'))
}

const POST = (req, res) => {
    let file = req.files.file
    let fileName = uniqueId(5) + file.name.replace(/\s/g, "_").trim()
    file.mv(path.join(process.cwd(), 'src', 'uploads', 'files', fileName), (err) => {
        if (err) console.log(err)
        let message = addFiles(req.body, fileName)
        if (message) {
            res.status(201).json({
                message: "The message has sent",
                body: message
            })
        } 
    })    
}

module.exports = {GET, POST}