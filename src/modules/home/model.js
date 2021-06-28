const fs = require('fs')
const path = require('path')

const addFiles = (message, file_link) => {
    const messages = require(path.join(process.cwd(), 'src', 'database', 'files.json'))
    const message_id = messages.length ? messages[messages.length - 1].message_id + 1 : 1
    const newMessage = {message_id, ... message, file_link}
    messages.push(newMessage)
    fs.writeFileSync(path.join(process.cwd(), 'src', 'database', 'files.json'), JSON.stringify(messages, null, 4))
    return newMessage
}

module.exports = {addFiles}