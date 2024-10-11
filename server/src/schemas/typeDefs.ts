const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    bookCount: Number
    savedBooks: [Book!]!
  }

  type Book {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    link: String
  }

  input BookInput {
    authors: [String!]!
    description: String!
    title: String!
    bookId: String!
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
    createUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User!
    deleteBook(bookId: ID!): User!
  }
`;

export default typeDefs;
