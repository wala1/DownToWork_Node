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
  getTrialByIdUser,
};
