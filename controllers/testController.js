const Test = require('../models/test');

//*****************************Create ****************/
const addTest = async (req, res, next) => {
  console.log(req.file, req.body, 16)

  if (Object.keys(req.body).length === 0) {
    res.status(400).send({ message: "Content can not be emtpy!" });
    return;
  }

  const test = new Test({
    name: req.body.name,
    category: req.body.category,
    nbrQuiz: req.body.nbrQuiz,
    nbrParticipant: req.body.nbrParticipant,
    description: req.body.description,
    picture: {
      data: req.file.buffer,
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    },
    creator: req.body.creator
  });

  test.save()
    .then((testres) => res.status(201).json({ message: "Test added with sucess !", testres }))
    .catch(err => res.status(400).json({ message: err.message || "Some error occurred while creating a Test" }));

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
  if (Object.keys(req.body).length === 0) {
    return res.status(400).send({ message: "test with new informations must be provided" });
  }

  const id = req.params.id;
  const updates = { ...req.body };
  if (req.file) {
    updates.picture = {
      contentType: req.file.mimetype,
      imgUrl: req.file.path
    };
  }

  Test.findByIdAndUpdate(
    { _id: id },
    updates,
    { useFindAndModify: false, new: true }
  )
    .then((test) => {
      if (!test) {
        return res.status(404).send({ message: `Cannot Update test with ${id}. Maybe test not found!` });
      }
      res.send(test);
    })
    .catch((err) => res.status(500).send({ message: "Error Update test information", error: +err }));
};


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

// Update an existing quiz
const updateTestQuizNumberDecrement = async (req, res) => {
  try {
    const testId = req.params.id.trim();
    const test = await Test.findById(testId);
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { nbrQuiz: test.nbrQuiz - 1 },
      { new: true }
    );
    res.status(200).json(updatedTest);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update an existing quiz
const updateTestQuizNumber = async (req, res) => {
  try {
    const testId = req.params.id;
    const test = await Test.findById(testId);
    const updatedTest = await Test.findByIdAndUpdate(
      testId,
      { nbrQuiz: test.nbrQuiz + 1},
      { new: true }
    );
    res.status(200).json(updatedTest);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  allList,
  addTest,
  updateTest,
  getTestById,
  getTestByType,
  deleteTest,
  getTestPagination,
  updateTestQuizNumber,
  updateTestQuizNumberDecrement
}