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
  mutation Mutation($input: UserInput!) {
  addUser(input: $input) {
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
      success
      message
      bookId
    }
  }
`;
