var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var gameSchema = new Schema({
  title: { type: String, required: true, unique: true },
  type: { type: String, lowercase: true, required: true, index: true },
  theme: { type: String, lowercase: true, required: true, index: true },
  description: { type: String, required: true },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now, index: true },
  meta: {
    votes: { type: Number, default: 0, index: true },
    favs: { type: Number, default: 0, index: true }
  }
});

module.exports = gameSchema;
