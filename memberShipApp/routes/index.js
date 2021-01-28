const router = require('express').Router()
const Controller = require('../controller/controller')
const storeRouter = require('./storeRoutes')
const userRouter = require('./userRoutes')

router.get('/', Controller.home)

// ========= register ============
router.get('/register', Controller.register)
router.post('/register', Controller.registerPost)

// ========== login ==============
router.get('/login', Controller.login)
router.post('/login', Controller.loginPost)


router.use('/stores', storeRouter)

router.use('/users', userRouter)


module.exports = router