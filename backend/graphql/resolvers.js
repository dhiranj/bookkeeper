const { Op } = require('sequelize');
const db = require('../models');
const { Book, Author } = db;
const Review = require('../models/review'); // MongoDB Review model
const mongoose = require('mongoose'); // ✅ Import mongoose for ObjectId handling

const resolvers = {
  Query: {
    // ✅ Get all books with optional filters
    books: async (_, { title, author, limit = 10, offset = 0 }) => {
      const where = {};
      if (title) where.title = { [Op.iLike]: `%${title}%` };
      if (author) where['$author.name$'] = { [Op.iLike]: `%${author}%` };

      return await Book.findAll({
        where,
        include: [{ model: Author, as: 'author' }],
        limit,
        offset,
      });
    },

    // ✅ Get a single book by ID
    book: async (_, { id }) => {
      return await Book.findByPk(id, {
        include: [{ model: Author, as: 'author' }],
      });
    },

    // ✅ Get all authors with optional filters
    authors: async (_, { name, limit = 10, offset = 0 }) => {
      const where = name ? { name: { [Op.iLike]: `%${name}%` } } : {};
      return await Author.findAll({ where, limit, offset });
    },

    // ✅ Get a single author by ID
    author: async (_, { id }) => {
      return await Author.findByPk(id, {
        include: [{ model: Book, as: 'books' }],
      });
    },

    // ✅ Get reviews for a book
    reviews: async (_, { bookId }) => {
      if (!mongoose.Types.ObjectId.isValid(bookId)) {
        throw new Error("Invalid book ID format.");
      }
      return await Review.find({ bookId: new mongoose.Types.ObjectId(bookId) }).exec();
    },
  },

  Mutation: {
    // ✅ Add Book
    addBook: async (_, { title, description, published_date, author_id }) => {
      const author = await Author.findByPk(author_id);
      if (!author) throw new Error("Author not found");
      return await Book.create({ title, description, published_date, author_id });
    },

    // ✅ Update Book
    updateBook: async (_, { id, title, description, published_date }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error("Book not found");
      return await book.update({ title, description, published_date });
    },

    // ✅ Delete Book
    deleteBook: async (_, { id }) => {
      const book = await Book.findByPk(id);
      if (!book) throw new Error("Book not found");
      await book.destroy();
      return "Book deleted";
    },

    // ✅ Add Author
    addAuthor: async (_, { name, biography, born_date }) => {
      return await Author.create({ name, biography, born_date });
    },

    // ✅ Update Author
    updateAuthor: async (_, { id, name, biography, born_date }) => {
      const author = await Author.findByPk(id);
      if (!author) throw new Error("Author not found");
      return await author.update({ name, biography, born_date });
    },

    // ✅ Delete Author
    deleteAuthor: async (_, { id }) => {
      const author = await Author.findByPk(id);
      if (!author) throw new Error("Author not found");

      // Check if the author has books before deleting
      const bookCount = await Book.count({ where: { author_id: id } });
      if (bookCount > 0) throw new Error("Cannot delete author with books.");

      await author.destroy();
      return "Author deleted";
    },

    // ✅ Add Review (Fix for MongoDB ObjectId issue)
    addReview: async (_, { bookId, review, rating }) => {
      const bookExists = await Book.findByPk(bookId);
      if (!bookExists) throw new Error("Book not found");

      return await Review.create({
        bookId: new mongoose.Types.ObjectId(bookId), // ✅ Convert to ObjectId
        review,
        rating,
      });
    },
  },
};

module.exports = resolvers;
