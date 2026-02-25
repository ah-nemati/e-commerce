import { NextApiRequest, NextApiResponse } from "next";
import users from "../../utils/models/user";
import ConnectDB from "../../utils/mongodb";
import bcrypt from "bcrypt";

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

    const findUser = await users.findOne({ email });

    if (!findUser) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password||"");

    if (!isPasswordCorrect) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const { password: _, ...userWithoutPassword } = findUser.toObject();

    return res.status(200).json({ success: true, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}