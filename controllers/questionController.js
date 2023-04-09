const Question = require('../models/question');

// Get all questions
const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a question by TYPE
const getQuestionsByType = async (req, res) => {
    try {
      const type = req.params.type;
      const questions = await Question.find({ type: type });
      res.status(200).json({ success: true, questions: questions });
      if (!questions || questions.length === 0) {
        return res.status(404).json({ message: 'Questions not found for this type' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server Error' });
    }
  };

// Create a new question
const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update an existing question
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a choice to a question
const addChoice = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const { text, picture, response } = req.body;
    question.choices.push({ text, picture, response });
    await question.save();
    res.status(201).json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a choice in a question
const updateChoice = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const choice = question.choices.id(req.params.choiceId);
    if (!choice) {
      return res.status(404).json({ message: 'Choice not found' });
    }
    const { text, picture, response } = req.body;
    choice.text = text || choice.text;
    choice.picture = picture || choice.picture;
    choice.response = response || choice.response;
    await question.save();
    res.json(question);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
}
};


const deleteChoice = async(req,res) => {
  try {
    const { questionId, choiceId } = req.body;
    const question = await Question.findById(questionId);
    
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    const choiceIndex = question.choices.findIndex(choice => choice.id === choiceId);
    
    if (choiceIndex === -1) {
      return res.status(404).json({ message: 'Choice not found' });
    }

    question.choices.splice(choiceIndex, 1);
    await question.save();

    res.json({ message: 'Choice deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

/* ========= GET QUESTIONS BY ID QUIZ ================*/
const getQuestionsByIdQuiz = async(req,res) => {
  try {
    const { id } = req.query;
    const questions = await Question.find({ idQuiz: id });
    res.status(200).json({
      message: "Questions fetched successfully!",
      questions: questions
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

module.exports = {
    getAllQuestions,
    getQuestionById,
    getQuestionsByType,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    addChoice,
    updateChoice,
    deleteChoice,
    getQuestionsByIdQuiz
  };
  