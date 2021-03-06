const { Router } = require('express')
const authController = require('../controllers/authController')
const router = Router()

// SIGNUP
router.get('/signup', authController.signup_get)
router.post('/signup', authController.signup_post)

// LOGIN
router.get('/login', authController.login_get)
router.post('/login', authController.login_post)

// LOGOUT
router.get('/logout', authController.logout_get)

// RESET PASSWORD
router.get('/reset', authController.reset_get)
router.post('/reset', authController.reset_post)
router.get('/reset/:id', authController.resetPage_get)
router.post('/reset/:id', authController.resetPage_post)

module.exports = router
