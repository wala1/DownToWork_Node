const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const choiceSchema = mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  response: {
    type: Boolean,
    required: true
  }
});

const questionSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['multiple', 'rating', 'dropdown', 'likert scale'],
    required: true
  },
  feedback: {
    type: String,
    required: true
  },
  picture: {
    type: String
  },
  score: {
    type: Number,
    required: true,
  },
  correctChoices: {
    type: Number,
    required: true
  },
  numberOfChoices: {
    type: Number,
    required: true
  },
  choices: {
    type: [choiceSchema],
    required: true
  }
});

questionSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Question', questionSchema);
