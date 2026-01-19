const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.put('/:id/stats', userController.updateUserStats);
router.post('/:id/achievements', userController.addAchievement);

module.exports = router;
