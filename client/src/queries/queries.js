import { gql } from "@apollo/client";

export const GET_BOOKS_QUERY = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export const GET_AUTHORS_QUERY = gql`
  {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOK_QUERY = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
      }
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;
