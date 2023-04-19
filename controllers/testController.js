const Test = require('../models/test');

const addTest = async (req, res, next) => {
  console.log(req.picture);

  let test = new Test({
    name: req.body.name,
    category: req.body.category,
    nbrQuiz: req.body.nbrQuiz,
    nbrParticipant: req.body.nbrParticipant,
    description: req.body.description,
    picture: req.body.picture,
    creator: req.body.creator
  });

  test = await test.save();
  res.send(test);
}


/* ========= ALL TEST ================*/
const allList = async (req, res, next) => {
  try {
    const tests = await Test.find();
    res.status(200).json({
      message: "Test fetched successfully!",
      tests: tests
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= UPDATE TEST ================*/
const updateTest = async (req, res) => {
  try {
    const { id, name, category, nbrQuiz, nbrParticipant, description, picture, creator } = req.body;
    const result = await Test.findByIdAndUpdate(id, {
      name,
      category,
      nbrQuiz,
      nbrParticipant,
      description,
      picture,
      creator
    }, { new: true });
    res.status(200).json({
      message: "Test updated successfully!",
      test: result
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= GET TEST BY ID ================*/
const getTestById = async (req, res) => {
  const test = await Test.findById(req.params.id);
  if (!test) return res.status(404).json({ message: "Test not found" });
  res.status(200).json({ message: "Test fetched successfully!", test: test });
}


/* ========= GET TEST BY TYPE ================*/
const getTestByType = async (req, res) => {
  try {
    const { category } = req.body;
    const tests = await Test.find({ category: category });
    res.status(200).json({
      message: "Tests fetched successfully!",
      tests: tests
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= DELETE TEST ================*/
const deleteTest = async (req, res) => {
  try {
    const { id } = req.body;
    await Test.findByIdAndDelete(id);
    res.status(200).json({
      message: "Test deleted successfully!",
    });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
}

/* ========= GET LIST OF TEST PAGINATION ================*/
const getTestPagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 3;
  const skip = (page - 1) * perPage;

  try {
    const tests = await Test.find().skip(skip).limit(perPage);
    const totalTests = await Test.countDocuments();
    const totalPages = Math.ceil(totalTests / perPage);

    res.json({
      tests,
      currentPage: page,
      totalPages,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}



module.exports = {
  allList,
  addTest,
  updateTest,
  getTestById,
  getTestByType,
  deleteTest,
  getTestPagination
}