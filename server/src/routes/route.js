const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')
const blogController = require('../controllers/blogController')
const pengumanController = require('../controllers/pengumumanController')
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
module.exports = router;
