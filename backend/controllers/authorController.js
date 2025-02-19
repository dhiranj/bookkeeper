const Author = require('../models/Author');

exports.getAllAuthors = async (req, res) => {
  const authors = await Author.findAll();
  res.json(authors);
};