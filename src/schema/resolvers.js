import { User } from "../models/User";
import { MassEmail } from "../models/MassEmail";

export const resolvers = {
  Query: {
    users: async () => await User.find(),
    myEmails: async (_, {}) => {
      return await MassEmail.find();
    },
  },

  Mutation: {
    createUser: async (_, { email, login, password }) => {
      if (await User.findOne({ email }))
        return {
          message: "User with this email exists",
          created: false,
        };
      if (await User.findOne({ login }))
        return {
          message: "Login already exists",
          created: false,
        };
      const newUser = new User({ email, login, password });

      const info = await newUser
        .save()
        .then(() => ({
          message: "Everything is fine",
          created: true,
        }))
        .catch(() => ({
          message: "Could not save new User",
          created: false,
        }));
      return info;
    },
    authenticate: async (_, { emailOrEmail, password }) => {
      if (false)
        return {
          authenticated: false,
          message: "Wrong Email or Login",
          token: "",
        };
      if (false)
        return {
          authenticated: false,
          message: "Wrong Password or Login",
          token: "",
        };
      return {
        authenticated: true,
        message: "Correct Authentication",
        token: "weipqwoiepyuwqeotuioweu",
      };
    },
  },
};
