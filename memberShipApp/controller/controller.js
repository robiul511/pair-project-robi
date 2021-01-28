const {User} = require('../models')
const checkPassword = require('../helpers/function-check-password')
const nodemailer = require('nodemailer')

class Controller {
    static home(req, res) {
        res.render('home.ejs')
    }

    // =========== register ==========
    static register(req, res) {
        res.render('form-register.ejs')
    }
    static registerPost(req, res) {
        let dataInput = req.body
        User.create(dataInput)
            .then(data => {
                // console.log(data)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mohammad.robiul.t.a@gmail.com',
                        pass: 'tigjqvpfojamugus'
                    }
                })
                const mailOptions = {
                    from: 'mohammad.robiul.t.a@gmail.com',
                    to: data.email,
                    subject: 'succses register',
                    text: `${data.user_name} wlcome in memberships app, you can membering in many stores`
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    res.redirect('/users')
                });
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
                if(!comparePasword) {
                    res.redirect('/login')
                } else {
                    req.session.user = {
                        isLogedIn : true,
                        id: data.id,
                        user_name: data.user_name,
                        role: data.role
                    }
                    res.redirect('/')
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    // ============= log out ============
    static logout(req, res) {
        console.log(req.session.user)
        req.session.user = {
            isLogedIn: false
        }
        res.redirect('/')
        // console.log(req.session)
    }
}

module.exports = Controller