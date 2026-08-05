const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const leaderboardController = require('../controllers/leaderboardController');

const routerLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false });
router.use(routerLimiter);

// Leaderboard routes
router.get('/global', leaderboardController.getGlobalLeaderboard);
router.get('/today', leaderboardController.getTodayLeaderboard);
router.get('/weekly', leaderboardController.getWeeklyLeaderboard);
router.get('/mode/:mode', leaderboardController.getTopScoresByMode);
router.get('/rank/:userId', leaderboardController.getUserRank);

module.exports = router;
