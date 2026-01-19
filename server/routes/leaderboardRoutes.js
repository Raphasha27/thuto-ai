const express = require('express');
const router = express.Router();
const leaderboardController = require('../controllers/leaderboardController');

// Leaderboard routes
router.get('/global', leaderboardController.getGlobalLeaderboard);
router.get('/today', leaderboardController.getTodayLeaderboard);
router.get('/weekly', leaderboardController.getWeeklyLeaderboard);
router.get('/mode/:mode', leaderboardController.getTopScoresByMode);
router.get('/rank/:userId', leaderboardController.getUserRank);

module.exports = router;
