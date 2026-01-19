const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/start', quizController.startQuiz);
router.post('/submit', quizController.submitQuizResult);
router.get('/history/:userId', quizController.getStudentHistory);

module.exports = router;
