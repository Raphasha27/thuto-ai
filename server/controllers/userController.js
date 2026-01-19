const User = require('../models/User');

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    const user = new User({ username, email });
    await user.save();
    
    res.status(201).json({ 
      message: 'User created successfully', 
      user 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user stats
exports.updateUserStats = async (req, res) => {
  try {
    const { id } = req.params;
    const { score, piecesPlaced, linesCleared, playTime } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update stats
    user.totalScore += score || 0;
    user.gamesPlayed += 1;
    user.highScore = Math.max(user.highScore, score || 0);
    user.stats.totalPiecesPlaced += piecesPlaced || 0;
    user.stats.totalLinesCleared += linesCleared || 0;
    user.stats.totalPlayTime += playTime || 0;

    // Level up logic (every 1000 points)
    user.level = Math.floor(user.totalScore / 1000) + 1;

    await user.save();
    res.json({ message: 'User stats updated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ totalScore: -1 }).limit(100);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add achievement
exports.addAchievement = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, icon } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.achievements.push({
      name,
      description,
      icon,
      unlockedAt: new Date()
    });

    await user.save();
    res.json({ message: 'Achievement added', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
