import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed" });
  }

  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const users = await readDB("users.json");

    const findUser = users.find((user) => user.email === email);

    if (findUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const newUser = {
      id: Date.now(),
      email,
      password: await bcrypt.hash(password, 12),
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedUsers = [...users, newUser];

    await writeDB("users.json", updatedUsers);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
