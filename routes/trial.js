const express = require('express');
const router = express.Router();
const {saveTrialData,getTrialById,getTrialByIdUser,getAllTrialsForUser,getTrialsByPeriodAndUser,getTrialsByTimeSpentAndUser,getTrialsByScoreAndUser} = require('../controllers/trialController');

router.post('/saveTrial', saveTrialData);
router.get('/:id', getTrialById);
router.get('/user/:userId', getAllTrialsForUser);
router.get('/getTrialByIdUser/:id', getTrialByIdUser);
router.get('/user/:userId/period', getTrialsByPeriodAndUser);
router.get('/user/:userId/time', getTrialsByTimeSpentAndUser);
router.get('/user/:userId/score', getTrialsByScoreAndUser);
module.exports = router;