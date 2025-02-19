const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();

// ✅ Ensure Sequelize connects to PostgreSQL using Docker service name
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DATABASE_SSL === "true"
  },
  logging: false
});

// ✅ Ensure Mongoose connects to MongoDB using Docker service name
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

module.exports = { sequelize, mongoose };
