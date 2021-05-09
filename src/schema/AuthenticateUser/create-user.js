import { validate } from "secure-password-validator";
import { User } from "../../models/User";
import validator from "email-validator";
import { generateHash } from "./HashOperations";

const options = {
  // options and its keys are optional
  // min password length, default = 8, cannot be less than 8
  minLength: 8,
  // max password length, default = 100, cannot be less than 50
  maxLength: 50,
  // password Must have numbers, default = false
  digits: true,
  // password Must have letters, default = false
  letters: true,
  // password Must have uppercase letters, default = false
  uppercase: true,
  // password Must have lowercase letters, default = false
  lowercase: true,
};

export const CreateUser = async (_, { email, login, password }) => {
  if (
    await User.findOne({
      $or: [{ login: email }, { email }],
    })
  )
    return {
      message: "User with this email exists",
      created: false,
    };
  const emailVal = validator.validate(email);
  if (!emailVal)
    return {
      message: "Wrong email address",
      created: false,
    };

  if (
    await User.findOne({
      $or: [{ login }, { email: login }],
    })
  )
    return {
      message: "Login already exists",
      created: false,
    };

  const result = validate(password, options);
  if (!result.valid)
    return {
      message: result.errors.reduce((a, b) => a + `, ${b}`, ""),
      created: false,
    };

  return storePasswd({ email, login, password });
};

const storePasswd = async ({ email, login, password }) => {
  const hashedPasswd = await generateHash(password);
  if (!hashedPasswd)
    return {
      message: "Everything is fine",
      created: true,
    };
  const newUser = new User({ email, login, password: hashedPasswd });
  return await newUser
    .save()
    .then(() => ({
      message: "Everything is fine",
      created: true,
    }))
    .catch(() => ({
      message: "Could not save new User",
      created: false,
    }));
};
