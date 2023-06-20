const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
    const { userId, responses } = req.body;
    
    const newQuiz = new Quiz({ userId, responses });
    
    try {
        const quiz = await newQuiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getQuizzesByUserId = async (req, res) => {
    const userId = req.params.userId;
    
    try {
        const quizzes = await Quiz.find({ userId });
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
