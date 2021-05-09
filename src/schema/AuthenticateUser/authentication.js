require("dotenv").config();
import { User } from "../../models/User";
import { concatPasswords } from "./HashOperations";
import { sign, verify } from "jsonwebtoken";

export const Authenticate = async (_, { loginOrEmail, password }) => {
  const user = await User.findOne({
    $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
  });
  if (!user)
    return {
      authenticated: false,
      message: "Can not find such a User",
      token: "",
    };
  if (!concatPasswords(password, user.password))
    return {
      authenticated: false,
      message: "Wrong Password",
      token: "",
    };
  const token = sign(
    {
      login: user.login,
      email: user.email,
      password: password,
    },
    process.env.ACCESS_TOKEN_SECRET
  );
  return {
    authenticated: true,
    message: "Correct Authentication",
    token,
  };
};

export const GetTheUser = async (token) => {
  try {
    const user = verify(token, process.env.ACCESS_TOKEN_SECRET);
    const dbUser = await User.findOne({
      $or: [{ login: user.login }, { email: user.email }],
    });
    if (!dbUser || !concatPasswords(user.password, dbUser.password))
      return undefined;
    return dbUser;
  } catch {
    return undefined;
  }
};
