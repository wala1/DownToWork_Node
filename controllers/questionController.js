const Question = require('../models/question');
const mongoose = require('mongoose');

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
  const question = await Question.findById(req.params.id);
  if (!question) return res.status(404).json({ message: "Question not found" });
  res.status(200).json({ message: "Question fetched successfully!", question: question });
}

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
  console.log(req.file, req.body, 16)

  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  let question = new Question(req.body);
  if (req.file) {
    question.picture = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    }
  }

  question.save()
    .then((questionRes) => res.status(201).json({ message: "Question added with sucess !", questionRes }))
    .catch(err => res.status(400).json({ message: err.message || "Some error occurred while creating a Question" }));
};

// Update an existing question
const updateQuestion = async (req, res) => {
  const id = req.params.id;
  const updates = { ...req.body };



  if (updates.choices) {
    updates.choices.forEach((choice, index) => {
      const choiceUpdates = {};
      if (choice.text) {
        choiceUpdates[`choices.${index}.text`] = choice.text;
      }
      if (choice.response !== undefined) {
        choiceUpdates[`choices.${index}.response`] = choice.response;
      }
      Question.updateOne(
        { _id: id },
        { $set: choiceUpdates },
        { useFindAndModify: false }
      )
        .then(() => {
          console.log(`Choice ${index} in question ${id} has been updated.`);
        })
        .catch((err) => {
          console.error(`Error updating choice ${index} in question ${id}:`, err);
        });
    });
  }
  if (req.file) {
    updates.picture = {
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    };
  }
  Question.findByIdAndUpdate(
    { _id: id },
    updates,
    { useFindAndModify: false, new: true }
  )
    .then((question) => {
      if (!question) {
        return res.status(404).send({ message: `Cannot update question with ${id}. Question not found!` });
      }
      res.send(question);
    })
    .catch((err) => res.status(500).send({ message: "Error Update question information", error: +err }));

};


// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.body;
    await Question.findByIdAndDelete(id);
    res.status(200).json({
      message: "Question deleted successfully!",
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
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


const deleteChoice = async (req, res) => {
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
const getQuestionsByIdQuiz = async (req, res) => {
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


/* ========= GET QUESTIONS BY ID QUIZ ================*/
const getQuestionsByQuizId = async (req, res) => {
  try {
    const { id } = req.params;
    const questions = await Question.find({ idQuiz: id });
    res.status(200).json({
      message: "Questions fetched successfully!",
      questions: questions
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


/* ========= GET LIST OF QUESTION PAGINATION ================*/
const getQuestionsPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 3;
  const skip = (page - 1) * perPage;

  try {
    const questions = await Question.find().skip(skip).limit(perPage);
    const totalQuestions = await Question.countDocuments();
    const totalPages = Math.ceil(totalQuestions / perPage);

    res.json({
      questions,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}


// Update an existing question
const updateQuestionParameterId = async (req, res) => {
  try {
    const updatedQuestion = await Question.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedQuestion);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update an existing question
const copyQuestion = async (req, res) => {
  const { questionId } = req.params;
  // Retrieve the question with the given id
  Question.findById(questionId, (err, question) => {
    if (err) {
      // Handle errors
      console.error(err);
      res.status(500).send('Error retrieving question');
    } else {
      // Create a copy of the question
      const newQuestion = new Question({
        ...question.toObject(),
        _id: new mongoose.Types.ObjectId(),
      });
      // Save the copy of the question
      newQuestion.save((err, savedQuestion) => {
        if (err) {
          // Handle errors
          console.error(err);
          res.status(500).send('Error creating copy of question');
        } else {
          res.send(savedQuestion);
        }
      });
    }
  });
};

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
  getQuestionsByIdQuiz,
  getQuestionsPagination,
  updateQuestionParameterId,
  copyQuestion,
  getQuestionsByQuizId
};
