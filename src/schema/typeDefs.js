import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    email: String!
    login: String!
    password: String!
  }

  type MassEmail {
    user: String!
    body: String!
    mailingAddresses: [String!]!
  }

  type Message {
    message: String!
    created: Boolean!
  }

  type Query {
    users: [User!]!
    myEmails: [MassEmail!]!
  }

  type Authenticate {
    authenticated: Boolean!
    message: String!
    token: String!
  }
  type Mutation {
    createUser(email: String!, login: String!, password: String!): Message!
    authenticate(emailOrEmail: String!, password: String!): Authenticate!
  }
`;
