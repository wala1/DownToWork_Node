const express = require('express');
const router = express.Router();
const {
  createTrial,
  getTrialById,
  getAllTrialsForUser,
  getTrialsByPeriodAndUser,
  getTrialsByTimeSpentAndUser,
  getTrialsByScoreAndUser
} = require('../controllers/trialController');

router.post('/', createTrial);
router.get('/:id', getTrialById);
router.get('/user/:userId', getAllTrialsForUser);
router.get('/user/:userId/period', getTrialsByPeriodAndUser);
router.get('/user/:userId/time', getTrialsByTimeSpentAndUser);
router.get('/user/:userId/score', getTrialsByScoreAndUser);

module.exports = router;
