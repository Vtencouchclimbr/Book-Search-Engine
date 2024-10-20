import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    user {
      username
      _id
    }
    token
  }
}
`;

export const SAVE_BOOK = gql`
  mutation SaveBook($input: ThoughtInput!) {
    saveBook(input: $input) {
      bookId
      title
      authors
      createdAt
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation RemoveBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      title
      authors
      description
      bookId
      image
      link
    }
  }
`;
