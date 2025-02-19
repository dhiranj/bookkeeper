import { gql } from "@apollo/client";

export const GET_BOOKS_AND_AUTHORS = gql`
  query GetBooksAndAuthors {
    books {
      id
      title
      description
      author {
        id
        name
      }
    }
    authors {
      id
      name
      biography
    }
  }
`;

export const GET_BOOK_DETAILS = gql`
  query GetBookDetails($id: ID!) {
    book(id: $id) {
      id
      title
      description
      author {
        name
      }
      reviews {
        review
        rating
      }
    }
  }
`;
