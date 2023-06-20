const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/all-users', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.post ('/new-user', userController.createUser);

router.put ('/:id', userController.updateUser);

router.delete ('/:id', userController.deleteUser);

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

module.exports = router;
