import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "KMA";

export const generateToken = (username: string): string => {
  return jwt.sign({ username }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const decodeToken = (token: string): string | undefined => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded === "string") {
      return decoded;
    } else if (typeof decoded === "object" && decoded !== null) {
      return decoded.username;
    }
  } catch (error) {
    throw new Error("Invalid token");
  }
};
