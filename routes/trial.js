const express = require('express');
const router = express.Router();
const { saveTrialData, getTrialByIdUser } = require('../controllers/trialController');

router.post('/saveTrial', saveTrialData);
router.get('/getTrialByIdUser/:id', getTrialByIdUser);

module.exports = router;
