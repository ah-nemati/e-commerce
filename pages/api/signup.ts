import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { readDB, writeDB } from "@/utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const users = await readDB("users.json");

    const exists = users.find((u: any) => u.email === email);

    if (exists) {
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
      createdAt: new Date().toISOString(),
    };

    await writeDB("users.json", [...users, newUser]);

    return res.status(201).json({
      success: true,
      message: "User created",
    });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}
