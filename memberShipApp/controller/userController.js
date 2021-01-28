const { Store, User, Membership } = require('../models')

class UserController {
    static showUsers(req, res) {
        User.findAll({
            include: [Store]
        })
            .then(data => {
                data = data.map(e => {
                    return e.getFullName(e)
                })
                // console.log(data)
                // res.send(data)
                res.render('users/show-users-list.ejs', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }
    
    // =========== show memberships =========
    static showMemberships(req, res) {
        let id = +req.params.id
        User.findOne({
            include: [Store],
            where: {id}
        })
            .then(data => {
                res.render('users/show-memberships.ejs', {data})
                // res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
        // res.send(id)
    }

    // ============ join memberships ============
    static joinMemberships(req, res) {
        let id = +req.params.id
        Store.findAll()
            .then(data => {
                res.render('users/form-join-membership.ejs', {id, data})
            })
            .catch(err => {
                req.send(err)
            })
    }
    static joinMembershipsPost(req, res) {
        let dataInput = {
            StoreId: +req.body.StoreId,
            UserId: +req.params.id
        }
        Membership.create(dataInput)
            .then(data => {
                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // ============ unJoin memberships ============
    static unJoinMemberships(req, res) {
        let id = +req.params.id
        User.findByPk(id, {
            include: [Store]
        })
            .then(data => {
                res.render('users/form-unjoin-memberships.ejs', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static unJoinMembershipsPost(req, res) {
        let UserId = +req.params.id
        let StoreId = +req.body.StoreId

        Membership.destroy({
            where: {
                UserId,
                StoreId
            }
        })
            .then(data => {
                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
            })
    }

    // =========== edit =========
    static editUser(req, res) {
        let id = +req.params.id
        User.findByPk(id)
            .then(data => {
                res.render('users/form-edit-user.ejs', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }
    static editUserPost(req, res) {
        let id = +req.params.id
        let dataInput = {
            first_name: req.body.first_name,
            last_name: req.body.last_name
        }
        User.update(dataInput, {
            where: {id}
        })
            .then(data => {
                res.redirect('/users') 
            })
            .catch(err => {
                res.send(err)
            })
        console.log(id, dataInput)
    }

    // ========== delete user ==========
    static deleteUser(req, res) {
        let id = +req.params.id
        User.destroy({
            where: {id}
        })
            .then(data => {
                res.redirect('/users')
            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = UserController