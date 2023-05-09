const Quiz = require('../models/quiz');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  const upload = multer({ storage: storage });
  
/* ========= ADD QUIZ ================*/
const addQuiz = async (req, res, next) => {
  console.log(req.file, req.body, 16)

  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const quiz = new Quiz({
    name: req.body.name,
    type: req.body.type,
    nbrQuestion: req.body.nbrQuestion,
    description: req.body.description,
    picture: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    },
    idTest: req.body.idTest
  });

  quiz.save()
    .then((quizRes) => res.status(201).json({ message: "Quiz added with sucess !", quizRes }))
    .catch(err => res.status(400).json({ message: err.message || "Some error occurred while creating a Quiz" }));

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

  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "quiz with new informations must be provided" });
  }

  const id = req.params.id;
  const updates = { ...req.body };

  if (req.file) {
    updates.picture = {
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    };

    Quiz.findByIdAndUpdate(
      { _id: id },
      updates,
      { useFindAndModify: false, new: true }
    )
      .then((quiz) => {
        if (!quiz) {
          return res.status(404).send({ message: `Cannot Update quiz with ${id}. Maybe quiz not found!` });
        }
        res.send(quiz);
      })
      .catch((err) => res.status(500).send({ message: "Error Update quiz information", error: +err }));
  };
}

/* ========= GET QUIZ BY ID ================*/
const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
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

/* ========= GET LIST OF QUIZ PAGINATION ================*/
const getQuizzesPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 3;
  const skip = (page - 1) * perPage;

  try {
    const quizzes = await Quiz.find().skip(skip).limit(perPage);
    const totalQuizzes = await Quiz.countDocuments();
    const totalPages = Math.ceil(totalQuizzes / perPage);

    res.json({
      quizzes,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}

// Update an existing quiz
const updateQuizQuestionNumber = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { nbrQuestion: quiz.nbrQuestion + 1 },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update an existing quiz
const updateQuizQuestionNumberDecrement = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Quiz.findById(quizId);
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      quizId,
      { nbrQuestion: quiz.nbrQuestion - 1 },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update an existing quiz
const updateQuizParameterId = async (req, res) => {
  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedQuiz);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  addQuiz,
  allList,
  updateQuiz,
  getQuizById,
  getQuizByType,
  deleteQuiz,
  getQuizzesByIdTest,
  getQuizzesPagination,
  updateQuizQuestionNumber,
  updateQuizQuestionNumberDecrement,
  updateQuizParameterId
}
