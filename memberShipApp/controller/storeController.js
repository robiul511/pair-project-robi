const { Store, User, Memberships } = require('../models')

class StoreController {
    // ======== menampilkan store list ===========
    static showStores(req, res) {
        Store.findAll({
            include: [User]
        })
            .then(data => {
                data = data.map(e => {
                    return Store.addWords((e))
                })
                res.render('stores/show-stores-list.ejs', {data})
            })
            .catch(err => {
                res.send(err)
            })
    }

    // ============= add store ===============
    static addStore(req, res) {
        res.render('stores/form-add-store.ejs')
    }
    static addStorePost(req, res) {
        let dataInput = req.body
        Store.create(dataInput)
            .then(data => {
                res.redirect('/stores')
            })
            .catch(err => {
                res.send(err)
            })

        // res.send(dataInput)
    }
}

module.exports = StoreController