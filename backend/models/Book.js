const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database').sequelize;

const Book = sequelize.define('Book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  published_date: {
    type: DataTypes.DATE,
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
