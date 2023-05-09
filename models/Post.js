const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const PostSchema = mongoose.Schema (
  {
    text: {type: String, required: true},
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {type: String},
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      }
    ],
    dislikes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      }
    ],
     hahaImoji: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      }
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        text: {type: String, required: true},
        name: {type: String, required: true},
        date: {type: Date, default: Date.now},
      }
    ],
  },
  {timestamps: true}
);

module.exports = mongoose.model ('Post', PostSchema);
