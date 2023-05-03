const Trial = require('../models/trial');

// Create a new trial
const saveTrialData = async (req, res) => {
  try {
    const trial = new Trial(req.body);
    await trial.save();
    console.log('Trial data saved successfully!');
    res.status(201).json({ message: 'Trial data saved successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while saving trial data.' });
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

// Get all trials within a specified time period for a user
const getTrialByIdUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const trial = await Trial.findOne({ userId }).sort({ endDate: -1 });
    res.status(200).json({ trial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  saveTrialData,
  getTrialById,
  getTrialByIdUser,
  getAllTrialsForUser,
  getAllTrialsForQuiz,
  getTrialsByTimePeriod
};
