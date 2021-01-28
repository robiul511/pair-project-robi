const {Store, User} = require('../models/index')
const nodemailer = require('nodemailer')

class StoreController {
    static getStoreList(req,res){
        Store.findAll()
        .then(data => {
            data = data.map(e => {
                return Store.addWords((e))
            })
            res.render('stores/show-store-list', {
                title : 'STORE LIST',
                dataStores: data
            })
        })

        .catch(err => {
            res.send(err)
        })

    }

    //===========================================================

    static getAddStore(req, res){
        res.render('stores/form-store-add', {
            title:' ADD STORE'
        })
    }

    static postAddStore(req, res){
        Store.create(req.body)
        .then(data => {
            res.redirect('/stores')
        })
        .catch(err => {
            res.send(err)
        })
    }

    //===========================================================

    static getEditStore(req, res){
        Store.findAll({
            where: {
                id: +req.params.id
            }
        })
        .then(data => {
            res.render('stores/form-edit-store', {
                title: 'Edit Store',
                data
            })
        })
        
        .catch(err => {
            res.send(err)
        })
    }

    static postEditStore(req, res){
        Store.update(req.body, {
            where: {
                id: +req.params.id
            }
        })

        .then(data => {
            res.redirect('/stores')
        })

        .catch(err => {
            res.send(err)
        })
    }

    //===========================================================

    static getDestroyStore(req, res){
        Store.destroy({
            where: {
                id: +req.params.id
            }
        })

        .then(() => {
            res.redirect('/stores')
        })

        .catch(err => {
            res.send(err)
        })
    }

     //===========================================================

     static getPostEvent(req, res){
        let id = +req.params.id
        
        Store.findByPk(id)
            .then(data => {
                res.render('form-post-event', {data})
            })
            .catch(err => {
                res.send(err)
            })

    }

    static postEventStore(req, res){
        let id = +req.params.id
        let event = req.body.msg
        Store.findByPk(id, {
            include: [User]
        })
            .then(data => {
                
                let arrEmail = []
                for (let i = 0; i < data.Users.length; i++) {
                    arrEmail.push(data.Users[i].email)
                }
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mohammad.robiul.t.a@gmail.com',
                        pass: 'tigjqvpfojamugus'
                    }
                })
                const mailOptions = {
                    from: 'mohammad.robiul.t.a@gmail.com',
                    to: arrEmail.join(', '),
                    subject: 'Update Event',
                    text: `update event ${event}`
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) throw err;
                    res.redirect('/stores/postEvent/succes')
                });
            })
            .catch(err => {
                console.log(err)
                res.send(err)
            })
    }

    static getPostEventSucces(req, res){
        res.render('show-post-event')
    }
}

module.exports = StoreController