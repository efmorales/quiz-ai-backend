const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// analysis is the response from the OpenAI API. It will be referenced to populate the User model's quizResults array.

const QuizSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    responses: [
        {
            question: String,
            response: String
        }
    ],
    analysis: {
        type: String,
        
    },
    dateTaken: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz', QuizSchema);
