import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { typeDefs } from "./schema/typeDefs";
import { resolvers } from "./schema/resolvers";
import { GetTheUser } from "./schema/AuthenticateUser/authentication";

import cors from "cors";
import mongoose from "mongoose";
import expressJwt from "express-jwt";

const startServer = async () => {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization;

      // try to retrieve a user with the token
      if (!token) return;
      const user = await GetTheUser(token.split(" ")[1]);

      return { user };
    },
  });

  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://127.0.0.1:27017/ZTI_backend", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app.listen({ port: 4000 }, () => {
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
  });
};

startServer();
