const mongoose = require('mongoose');

const quizSessionSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  topic: {
    type: String, // e.g., "Algebra", "Organic Chemistry"
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Foundation', 'Matric', 'Advanced'],
    default: 'Matric'
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  aiFeedback: {
    type: String,
    default: "Keep practicing to improve your understanding."
  },
  timeSpent: Number, // Seconds
  completedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('QuizSession', quizSessionSchema);
