const mongoose = require('mongoose');
const {topicSchema} =  require('./Topics');
const MediaSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      videos: [{ type: String }],
    },
    {
      timestamps: true,
    }
);
module.exports = Media = mongoose.model("Media", MediaSchema);