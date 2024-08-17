import bcrypt from "bcrypt";
import { IUser } from "../interfaces/userInterface";
import { createUser, findUserByUsername } from "../models/userModel";
import { decodeToken } from "../utils/token";

export const registerUser = async (userData: IUser): Promise<IUser> => {
  const { username, password } = userData;

  const userAlreadyExists = await findUserByUsername(username);

  if (userAlreadyExists) {
    throw new Error("Username is already used");
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

export const verifyUser = async (token: string): Promise<IUser> => {
  const username = decodeToken(token);

  if (typeof username !== "string") {
    throw new Error("Invalid token payload");
  }

  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
