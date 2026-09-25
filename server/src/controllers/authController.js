import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from "../config/db.js";

export async function login(req, res) {
  try {
    const { username, password } = req.body;

    const result = await sql.query`
      SELECT *
      FROM Users
      WHERE Username = ${username}
    `;

    if (result.recordset.length === 0) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const user = result.recordset[0];

    const passwordMatch = await bcrypt.compare(
      password,
      user.PasswordHash
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.Id,
        username: user.Username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.Id,
        username: user.Username,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Login failed",
    });
  }
}