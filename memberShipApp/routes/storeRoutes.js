const router = require('express').Router()
const StoreController = require('../controller/storeController')

router.get('/', StoreController.showStores)

// ============ add stores =============
router.get('/add', StoreController.addStore)
router.post('/add', StoreController.addStorePost)

module.exports = router