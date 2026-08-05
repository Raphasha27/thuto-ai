const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const quizController = require('../controllers/quizController');

const routerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
router.use(routerLimiter);

router.post('/start', quizController.startQuiz);
router.post('/submit', quizController.submitQuizResult);
router.get('/history/:userId', quizController.getStudentHistory);

module.exports = router;
