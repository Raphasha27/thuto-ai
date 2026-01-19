const Game = require('../models/Game');
const User = require('../models/User');

// Get global leaderboard
exports.getGlobalLeaderboard = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    
    const leaderboard = await User.find()
      .select('username email avatar totalScore highScore gamesPlayed level')
      .sort({ totalScore: -1 })
      .limit(limit);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get top scores for a specific game mode
exports.getTopScoresByMode = async (req, res) => {
  try {
    const { mode } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    const topGames = await Game.find({ gameMode: mode, completed: true })
      .populate('userId', 'username avatar')
      .sort({ score: -1 })
      .limit(limit);

    res.json(topGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get today's top scores
exports.getTodayLeaderboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const topToday = await Game.find({ 
      completed: true,
      createdAt: { $gte: today }
    })
      .populate('userId', 'username avatar')
      .sort({ score: -1 })
      .limit(20);

    res.json(topToday);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get weekly leaderboard
exports.getWeeklyLeaderboard = async (req, res) => {
  try {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const topWeek = await Game.find({ 
      completed: true,
      createdAt: { $gte: weekAgo }
    })
      .populate('userId', 'username avatar')
      .sort({ score: -1 })
      .limit(50);

    res.json(topWeek);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user rank
exports.getUserRank = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const rank = await User.countDocuments({ totalScore: { $gt: user.totalScore } }) + 1;
    const totalUsers = await User.countDocuments();

    res.json({ 
      rank, 
      totalUsers,
      percentile: ((totalUsers - rank) / totalUsers * 100).toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
