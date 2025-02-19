const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Author {
  id: ID!
  name: String!
  biography: String
  born_date: String
  books: [Book] # ✅ One Author has many Books
}

type Book {
  id: ID!
  title: String!
  description: String
  published_date: String
  author: Author! # ✅ One Book belongs to One Author
}

type Review {
  id: ID!
  bookId: ID!
  review: String!
  rating: Int!
}

type Query {
  books(title: String, author: String, limit: Int, offset: Int): [Book]
  book(id: ID!): Book 
  authors(name: String, limit: Int, offset: Int): [Author]
  reviews(bookId: ID!): [Review]
  author(id: ID!): Author
}

type Mutation {
  addBook(title: String!, description: String, published_date: String, author_id: ID!): Book
  updateBook(id: ID!, title: String, description: String, published_date: String): Book
  deleteBook(id: ID!): String
  addReview(bookId: ID!, review: String!, rating: Int!): Review
}

type Mutation {
  addAuthor(name: String!, biography: String!, born_date: String!): Author!
  updateAuthor(id: ID!, name: String, biography: String, born_date: String): Author!
  deleteAuthor(id: ID!): String!
}

`;

module.exports = typeDefs;