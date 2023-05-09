const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator");

const quizSchema = mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["communication", "reading"], required: true },
    nbrQuestion: { type: Number, required: true },
    description: { type: String, required: true },
    picture: {
        data: Buffer,
        contentType: String,
        imgUrl: String
    },
    idTest: {
        type: mongoose.Schema.Types.String,
        ref: "Test",
    }
});

quizSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Quiz', quizSchema);
