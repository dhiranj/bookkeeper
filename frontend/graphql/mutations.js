import { gql } from "@apollo/client";

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $description: String!, $published_date: String!, $author_id: ID!) {
    addBook(title: $title, description: $description, published_date: $published_date, author_id: $author_id) {
      id
      title
    }
  }
`;

export const ADD_AUTHOR = gql`
  mutation AddAuthor($name: String!, $biography: String!, $born_date: String!) {
    addAuthor(name: $name, biography: $biography, born_date: $born_date) {
      id
      name
    }
  }
`;
