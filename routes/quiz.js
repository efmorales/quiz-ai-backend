const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

router.post('/create-quiz', quizController.createQuiz);
router.get('/user/:userId', quizController.getQuizzesByUserId);

module.exports = router;