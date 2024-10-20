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
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input BookInput {
    bookId: String!
    authors: [String!]!
    title: String!
    description: String!
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
    addUser(username: String ,email: String, password:String): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: BookInput!): User!
    removeBook(bookId: ID!): User!
  }
`;

export default typeDefs;
