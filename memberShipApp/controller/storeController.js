const {Store} = require('../models/index')

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
}

module.exports = StoreController