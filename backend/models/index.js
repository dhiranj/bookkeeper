const { Sequelize } = require('sequelize');
const sequelize = require('../config/database').sequelize;

// Import models
const Author = require('./Author');
const Book = require('./Book');

// Define relationships **here** to avoid circular dependencies
Author.hasMany(Book, { foreignKey: 'author_id', as: 'books' });
Book.belongsTo(Author, { foreignKey: 'author_id', as: 'author' });

module.exports = { sequelize, Author, Book };
