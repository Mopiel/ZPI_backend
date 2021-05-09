import bcrypt from "bcrypt";

const saltRounds = 10;

export const generateHash = (password) => bcrypt.hashSync(password, saltRounds);

export const concatPasswords = (myPlaintextPassword, hash) =>
  bcrypt.compareSync(myPlaintextPassword, hash);
