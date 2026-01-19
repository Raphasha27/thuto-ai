const QuizSession = require('../models/QuizSession');
const User = require('../models/User');
const { generateQuestion } = require('../services/aiTutor');

// Start a new Quiz Session
exports.startQuiz = async (req, res) => {
  try {
    const { userId, subject, topic, difficulty } = req.body;
    
    // Simulate AI generating a question set
    // In a real app, this might generate 5-10 questions and store them in the session
    const firstQuestion = generateQuestion(subject, 12, topic);

    res.status(201).json({ 
      message: 'Quiz Session Started', 
      sessionId: new mongoose.Types.ObjectId(), // Mock ID for now
      firstQuestion 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit a Quiz Result (End of session)
exports.submitQuizResult = async (req, res) => {
  try {
    const { userId, subject, topic, difficulty, score, totalQuestions, timeSpent } = req.body;

    const quiz = new QuizSession({
      studentId: userId,
      subject,
      topic,
      difficulty,
      score,
      totalQuestions,
      timeSpent
    });

    await quiz.save();

    // Update User Mastery & Streak
    const user = await User.findById(userId);
    if (user) {
      user.masteryPoints += score * 10; // Simple gamification
      user.highScore = Math.max(user.highScore || 0, score); // Legacy field, might want to refactor
      
      // Update Subject Proficiency
      const subIndex = user.subjects.findIndex(s => s.name === subject);
      if (subIndex >= 0) {
        // Simple moving average for demo
        user.subjects[subIndex].proficiency = (user.subjects[subIndex].proficiency + (score/totalQuestions * 100)) / 2;
      } else {
        user.subjects.push({ name: subject, proficiency: (score/totalQuestions * 100) });
      }

      await user.save();
    }

    res.status(201).json({ message: 'Quiz submitted successfully', quiz, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Quiz History
exports.getStudentHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await QuizSession.find({ studentId: userId })
      .sort({ completedAt: -1 })
      .limit(20);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
