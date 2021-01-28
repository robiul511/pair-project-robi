// const router = require('express').Router()
// const StoreController = require('../controller/storeController')

// router.get('/', StoreController.showStores)

// // ============ add stores =============
// router.get('/add', StoreController.addStore)
// router.post('/add', StoreController.addStorePost)

// module.exports = router

const express = require('express')
const router = express.Router()
const StoreController = require('../controller/storeController')
const checkLogin = require('../middleWare/checkLogin')
const isAdmin = require('../middleWare/isAdmin')

router.get('/', checkLogin, StoreController.getStoreList)

router.get('/add', isAdmin, StoreController.getAddStore)
router.post('/add', StoreController.postAddStore)

router.get('/edit/:id', isAdmin, StoreController.getEditStore)
router.post('/edit/:id', StoreController.postEditStore)

router.get('/delete/:id', isAdmin, StoreController.getDestroyStore)

router.get('/postEvent/:id', StoreController.getPostEvent)
router.post('/postEvent/:id', StoreController.postEventStore)


router.get('/postEvent/succes', StoreController.getPostEventSucces)



module.exports = router