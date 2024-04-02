const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')
const blogController = require('../controllers/blogController')
const pengumanController = require('../controllers/pengumumanController')
const profileController = require('../controllers/profileController')
const eventController = require('../controllers/eventController')
const jadwalController = require('../controllers/jadwalController')
// login
// router.post('/api/register', loginController.createRegisterAdmin);
router.post('/api/login', loginController.postLoginAdmin);
router.get('/api/user', loginController.getAllUsers);
router.use('/api/profile', loginController.getProfile);
router.post('/api/logout', loginController.getLogout);

// blog
router.use('/api', blogController)
router.get('/api', blogController)
router.put('/api', blogController)
router.delete('/api', blogController)

//penguman
router.use('/api', pengumanController)
router.get('/api', pengumanController)
router.put('/api', pengumanController)
router.delete('/api', pengumanController)

router.use('/api', profileController)
router.get('/api', profileController)
router.put('/api', profileController)
router.delete('/api', profileController)

router.use('/api', eventController)
router.get('/api', eventController)
router.put('/api', eventController)
router.delete('/api', eventController)

router.use('/api', jadwalController)
router.get('/api', eventController)
router.put('/api', jadwalController)
router.delete('/api', jadwalController)
module.exports = router;
