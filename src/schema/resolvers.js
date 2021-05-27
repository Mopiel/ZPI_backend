import { ObjectId } from "mongodb";
import { User } from "../models/User";
import { MassEmail } from "../models/MassEmail";
import { CreateUser } from "./AuthenticateUser/create-user";
import { Authenticate } from "./AuthenticateUser/authentication";
import { sendEmailFunc } from "../mailer/sendEmail";

export const resolvers = {
  Query: {
    isAuthenticated: (root, args, context) => !!context.user,
    myEmails: async (root, args, context) => {
      const user = context.user;
      if (!user) return null;
      return await MassEmail.find({ userId: user.id });
    },
    getEmail: async (root, { id }, context) => {
      const user = context.user;
      if (!user) return null;
      return await MassEmail.findOne({ _id: ObjectId(id), userId: user.id });
    },
  },

  Mutation: {
    createEmail: async (root, { name }, context) => {
      const user = context.user;
      if (!user) return null;
      const email = new MassEmail({
        name,
        userId: user.id,
        html: "",
        design: "",
        mailingAddresses: [],
      });
      return await email
        .save()
        .then((email) => email)
        .catch(() => null);
    },
    setEmailUsers: async (root, { id, name, mailingAddresses }, context) => {
      const user = context.user;
      if (!user) return null;

      await MassEmail.updateOne(
        { _id: ObjectId(id), userId: user.id },
        {
          $set: {
            name,
            mailingAddresses,
          },
        }
      );
      return await MassEmail.findOne({ _id: ObjectId(id), userId: user.id });
    },
    deleteEmail: async (root, { id }, context) => {
      const user = context.user;
      if (!user) return null;

      const operation = await MassEmail.deleteOne({
        _id: ObjectId(id),
        userId: user.id,
      });
      return operation.ok;
    },
    setEmailBody: async (root, { id, html, design }, context) => {
      const user = context.user;
      if (!user) return null;

      await MassEmail.updateOne(
        { _id: ObjectId(id), userId: user.id },
        {
          $set: {
            html,
            design,
          },
        }
      );
      return await MassEmail.findOne({ _id: ObjectId(id), userId: user.id });
    },
    sendEmail: async (root, { id }, context) => {
      const user = context.user;
      if (!user) return null;
      const email = await MassEmail.findOne({
        _id: ObjectId(id),
        userId: user.id,
      });
      if (!email) return false;
      return await sendEmailFunc(
        email.html,
        email.name,
        email.mailingAddresses
      );
    },
    createUser: CreateUser,
    authenticate: Authenticate,
  },
};
