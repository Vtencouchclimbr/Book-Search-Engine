const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book!]!
  }

  type Book {
    bookId: String
    authors: [String]
    title: String
    description: String
    image: String
    link: String
    createdAt: String
  }

  input UserInput {
    _id: ID
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    authors: [String!]!
    title: String!
    description: String
    image: String
    link: String
  }
  
  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): Book!
    removeBook(bookId: String): User!
  }
`;

export default typeDefs;
