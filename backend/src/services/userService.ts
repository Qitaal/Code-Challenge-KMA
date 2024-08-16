import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";
import { createUser, findUserByUsername } from "../models/userModel";

export const registerUser = async (userData: IUser): Promise<IUser> => {
  const { username, password } = userData;

  const userAlreadyExists = await findUserByUsername(username);

  if (userAlreadyExists) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await createUser({ ...userData, password: hashedPassword });

  return newUser;
};

export const loginUser = async (
  username: string,
  password: string
): Promise<IUser | null> => {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new Error("Invalid username or password");
  }

  return user;
};
