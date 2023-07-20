const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth') 
const homeController = require('../controllers/home')
const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', homeController.getIndex) 
        // router.get('/login', authController.getLogin)
        // router.post('/login', authController.postLogin)

        // @desc    Auth with Google
        // route    GET /auth/google
        // router.get('/google', authController.getLogin)

        // @des     Google auth callback
        // @route   GET /auth/google/callback
        // router.post('/google/callback', authController.postLogin)


router.get('/logout', authController.logout)
router.get('/signup', authController.getSignup)
router.post('/signup', authController.postSignup)

module.exports = router