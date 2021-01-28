const router = require('express').Router()
const UserController = require('../controller/userController')
const checkLogin = require('../middleWare/checkLogin')

router.get('/', checkLogin, UserController.showUsers)

// ============ show memberships =========
router.get('/:id/showmemberships', UserController.showMemberships)

// ============= join memberships ============
router.get('/:id/joinmemberships', UserController.joinMemberships)
router.post('/:id/joinmemberships', UserController.joinMembershipsPost)

// ============ unJoin memberships ============
router.get('/:id/unjoinmemberships', UserController.unJoinMemberships)
router.post('/:id/unjoinmemberships', UserController.unJoinMembershipsPost)

// ============ edit Users ============
router.get('/:id/edit', UserController.editUser)
router.post('/:id/edit', UserController.editUserPost)

// ======= delete user =========
router.get('/:id/delete', UserController.deleteUser)

module.exports = router