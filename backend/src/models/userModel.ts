import pool from "../config/database";
import { IUser } from "../interfaces/userInterface";

export const createUser = async (user: IUser): Promise<IUser> => {
  const { name, username, password } = user;
  const result = await pool.query(
    `INSERT INTO users (name, username, password) 
         VALUES ($1, $2, $3) 
         RETURNING name, username`,
    [name, username, password]
  );
  return result.rows[0];
};

export const findUserByUsername = async (
  username: string
): Promise<IUser | null> => {
  const result = await pool.query(
    `SELECT * FROM users 
         WHERE username = $1`,
    [username]
  );

  if (result.rows.length > 0) {
    return result.rows[0];
  } else {
    return null;
  }
};
