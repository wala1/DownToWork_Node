const Quiz = require('../models/quiz');

/* ========= ADD QUIZ ================*/
const addQuiz = async (req, res, next) => {
  console.log(req.picture);
  res.send('File uploaded successfully!');

  let quiz = new Quiz({
    name: req.body.name,
    type: req.body.type,
    nbrQuestion: req.body.nbrQuestion,
    description: req.body.description,
    picture: req.body.picture,
    idTest: req.body.idTest
  });

  quiz = await quiz.save();
  res.send(quiz);
}

/* ========= ALL QUIZ ================*/
const allList = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find();
    res.status(200).json({
      message: "Quizzes fetched successfully!",
      quizzes: quizzes
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= UPDATE QUIZ ================*/
const updateQuiz = async (req, res) => {
  try {
    const { id, name, type, nbrQuestion, description, picture, idTest } = req.body;
    const result = await Quiz.findByIdAndUpdate(id, {
      name,
      type,
      nbrQuestion,
      description,
      picture,
      idTest
    }, { new: true });
    res.status(200).json({
      message: "Quiz updated successfully!",
      quiz: result
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= GET QUIZ BY ID ================*/
const getQuizById = async (req, res) => {
  try {
    const { id } = req.query;
    const quiz = await Quiz.findById(id);
    res.status(200).json({
      message: "Quiz fetched successfully!",
      quiz: quiz
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= GET QUIZ BY TYPE ================*/
const getQuizByType = async (req, res) => {
  try {
    const { type } = req.query;
    const quizzes = await Quiz.find({ type: type });
    res.status(200).json({
      message: "Quizzes fetched successfully!",
      quizzes: quizzes
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= DELETE QUIZ ================*/
const deleteQuiz = async (req, res) => {
  try {
    const { id } = req.body;
    await Quiz.findByIdAndDelete(id);
    res.status(200).json({
      message: "Quiz deleted successfully!",
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= GET ALL QUIZZES BY ID TEST ================*/
const getQuizzesByIdTest = async (req, res) => {
  try {
    const { id } = req.query;
    const quizzes = await Quiz.find({ idTest: id });
    res.status(200).json({
      message: "Quizzes fetched successfully!",
      quizzes: quizzes
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}


module.exports = {
  addQuiz,
  allList,
  updateQuiz,
  getQuizById,
  getQuizByType,
  deleteQuiz,
  getQuizzesByIdTest
}
