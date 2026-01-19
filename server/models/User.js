const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  province: {
    type: String,
    enum: ['Gauteng', 'KZN', 'Western Cape', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape'],
    required: true
  },
  grade: {
    type: Number,
    enum: [8, 9, 10, 11, 12],
    required: true
  },
  schoolName: String,
  preferredLanguage: {
    type: String,
    default: 'English',
    enum: ['English', 'IsiZulu', 'IsiXhosa', 'Setswana', 'Sesotho']
  },
  masteryPoints: {
    type: Number,
    default: 0
  },
  streakDays: {
    type: Number,
    default: 0
  },
  subjects: [{
    name: { type: String, enum: ['Mathematics', 'Physical Sciences', 'Life Sciences', 'IT'] },
    proficiency: { type: Number, default: 0 } // 0-100%
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
