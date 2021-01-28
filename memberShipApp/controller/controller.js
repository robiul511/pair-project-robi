const {User} = require('../models')
const checkPassword = require('../helpers/function-check-password')

class Controller {
    static home(req, res) {
        res.render('home.ejs')
        // res.send('masuk controller home')
    }

    // =========== register ==========
    static register(req, res) {
        res.render('form-register.ejs')
    }
    static registerPost(req, res) {
        let dataInput = req.body
        User.create(dataInput)
            .then(data => {
                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // ============ login ===========
    static login(req, res) {
        res.render('form-login.ejs')
    }
    static loginPost(req, res) {
        let dataInput = {
            user_name: req.body.user_name,
            password: req.body.password
        }
        User.findOne({
            where: {
                user_name: dataInput.user_name
            }
        })
            .then(data => {
                let comparePasword = checkPassword(dataInput.password, data.password)
                console.log(comparePasword)
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller