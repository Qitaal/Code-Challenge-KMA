import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/userService";
import {
  validateRegistration,
  validateLogin,
} from "../validation/userValidation";

export const register = async (req: Request, res: Response): Promise<void> => {
  const validationError = validateRegistration(req.body);
  if (validationError) {
    const errorMessage = validationError.details
      .map((detail) => detail.message)
      .join(", ");
    res.status(400).json({ message: errorMessage });
    return;
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

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const validationError = validateLogin(req.body);
  if (validationError) {
    const errorMessage = validationError.details
      .map((detail) => detail.message)
      .join(", ");
    res.status(400).json({ message: errorMessage });
    return;
  }

  try {
    const user = await loginUser(username, password);

    if (user) {
      res.json({
        name: user.name,
        username: user.username,
      });
    }

    res.status(401).json({ message: "Invalid username or password" });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};
