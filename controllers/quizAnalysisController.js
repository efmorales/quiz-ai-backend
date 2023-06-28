const { Configuration, OpenAIApi } = require('openai');
const Quiz = require('../models/Quiz')
require('dotenv').config();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);

exports.analyzeQuizResponses = async (req, res) => {

    const { userId, responses } = req.body;

    // Construct the prompt for the OpenAI API

    const quizQuestions = responses.map((response, index) => `${index + 1}.${response.question}`);
    const quizAnswers = responses.map((response, index)  => `${index + 1}.${response.response}`);

    // console.log(quizQuestions);
    // console.log(quizAnswers);

    try {
        const prompt = `The user answered the following questions about their worldview:\n (${quizQuestions}) and answered the following:\n${quizAnswers}\nWhat philosophies might align with this worldview?`; // Construct your prompt based on quiz responses
        const maxTokens = 500; // You can adjust this

        console.log(prompt);

        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: prompt}],
            max_tokens: maxTokens,
            temperature: 0.5
        });

        // const completion = await openai.createCompletion({
        //     model: 'text-davinci-003',
        //     prompt: prompt,
        //     max_tokens: maxTokens,
        //     temperature: 0.5
        // });

        const analysis = completion.data.choices[0].message.content;

        // Create a new Quiz instance with the analysis data
        const quiz = new Quiz({ userId, responses, analysis });

        // Save the quiz to the database
        await quiz.save();

        res.status(200).json({ analysis });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
