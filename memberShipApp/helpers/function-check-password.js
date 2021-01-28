const bcrypt = require('bcryptjs')

function checkPassword(passwordInput, passwordDatabase){
    return bcrypt.compareSync(passwordInput, passwordDatabase)
}

module.exports = checkPassword