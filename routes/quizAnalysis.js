const express = require('express');
const router = express.Router();
const quizAnalysisController = require('../controllers/quizAnalysisController')

router.post('/analyze', quizAnalysisController.analyzeQuizResponses);

module.exports = router;