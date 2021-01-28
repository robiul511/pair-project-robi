const bcrypt = require('bcryptjs')

function encryptPassword(password) {
    const salt = bcrypt.genSaltSync(5)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

module.exports = encryptPassword