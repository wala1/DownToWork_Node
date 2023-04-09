const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const testSchema = mongoose.Schema({
    name:           { type: String, required: true },
    category:       { type: String, enum: ["level test", "diagnostic"], required: true },
    nbrQuiz:        { type: String, required: true},
    nbrParticipant: { type: String, required: true},
    description:    { type: String, required: true},
    picture:        { type: String, required: true, unique: true},
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
});

testSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Test', testSchema)