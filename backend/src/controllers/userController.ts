import { Request, Response } from "express";
import { registerUser, loginUser, verifyUser } from "../services/userService";
import {
  validateRegistration,
  validateLogin,
} from "../validation/userValidation";
import { generateToken } from "../utils/token";

export const register = async (req: Request, res: Response) => {
  const validationError = validateRegistration(req.body);
  if (validationError) {
    const errorMessage = validationError.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const newUser = await registerUser(req.body);

    res.status(201).json({
      name: newUser.name,
      username: newUser.username,
    });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const validationError = validateLogin(req.body);
  if (validationError) {
    const errorMessage = validationError.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ message: errorMessage });
  }

  try {
    const user = await loginUser(username, password);

    if (user) {
      res.json({
        name: user.name,
        username: user.username,
        token: generateToken(user.username),
      });
      return;
    }

    res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const getUserFromToken = async (req: Request, res: Response) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const user = await verifyUser(token);
    res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ message: (error as Error).message });
  }
};
