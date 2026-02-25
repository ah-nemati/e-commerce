import { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "../../utils/mongodb";
import bcrypt from "bcrypt";
import user from "../../utils/models/user";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await ConnectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const findUser = await user.findOne({ email });
    if (findUser) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const newUser = new user({
      email,
      password: await bcrypt.hash(password, 12),
    });

    await newUser.save();
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}