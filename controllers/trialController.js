const Trial = require('../models/trial');
const { validationResult } = require('express-validator');

// Create a new trial
const createTrial = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { userId, quizId, startTime, endTime, answers } = req.body;
    const trial = new Trial({
      user: userId,
      quiz: quizId,
      startTime,
      endTime,
      answers
    });
    const newTrial = await trial.save();
    res.status(201).json(newTrial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single trial by ID
const getTrialById = async (req, res) => {
  try {
    const trial = await Trial.findById(req.params.id);
    if (!trial) {
      return res.status(404).json({ message: 'Trial not found' });
    }
    res.json(trial);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all trials for a user
const getAllTrialsForUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const trials = await Trial.find({ user: userId });
    res.json(trials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all trials for a quiz
const getAllTrialsForQuiz = async (req, res) => {
  try {
    const { quizId } = req.body;
    const trials = await Trial.find({ quiz: quizId });
    res.json(trials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all trials within a specified time period for a user
const getTrialsByTimePeriod = async (req, res) => {
  try {
    const { userId, startDate, endDate } = req.body;
    const trials = await Trial.find({ user: userId, startTime: { $gte: startDate, $lt: endDate } });
    res.json(trials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createTrial,
  getTrialById,
  getAllTrialsForUser,
  getAllTrialsForQuiz,
  getTrialsByTimePeriod
};
