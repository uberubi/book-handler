// const { model, Schema } = require("mongoose");
const { model, Schema } = require("mongoose");

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String,
});

module.exports = model('Book', bookSchema)