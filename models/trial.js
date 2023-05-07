const mongoose = require('mongoose');

const trialSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  score: {
    type: Number,
    required: true,
  },
  answers: [{
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    selectedChoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Choice',
    },
  }],
});

module.exports = mongoose.model('Trial', trialSchema);
