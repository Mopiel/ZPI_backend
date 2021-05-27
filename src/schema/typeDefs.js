import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type User {
    email: String!
    login: String!
    password: String!
  }

  type MassEmail {
    id: String!
    userId: String!
    name: String!
    html: String!
    design: String!
    mailingAddresses: [String!]!
  }

  type Message {
    message: String!
    created: Boolean!
  }

  type Query {
    isAuthenticated: Boolean!
    myEmails: [MassEmail!]!
    getEmail(id: String!): MassEmail
  }

  type Authenticate {
    authenticated: Boolean!
    message: String!
    token: String!
  }
  type Mutation {
    createEmail(name: String!): MassEmail
    deleteEmail(id: String!): Boolean!
    sendEmail(id: String!): Boolean!
    setEmailUsers(
      id: String!
      name: String!
      mailingAddresses: [String!]
    ): MassEmail
    setEmailBody(id: String!, html: String!, design: String!): MassEmail
    createUser(email: String!, login: String!, password: String!): Message!
    authenticate(loginOrEmail: String!, password: String!): Authenticate!
  }
`;
