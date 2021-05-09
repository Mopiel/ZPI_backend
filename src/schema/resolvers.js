import { User } from "../models/User";
import { MassEmail } from "../models/MassEmail";
import { CreateUser } from "./AuthenticateUser/create-user";
import { Authenticate } from "./AuthenticateUser/authentication";

export const resolvers = {
  Query: {
    isAuthenticated: (root, args, context) => !!context.user,
    users: async () => await User.find(),
    myEmails: async (root, args, context) => {
      const user = context.user;
      if (!user) return null;
      console.log(user.id);
      // sendEmail();
      return await MassEmail.find();
    },
  },

  Mutation: {
    createUser: CreateUser,
    authenticate: Authenticate,
  },
};
