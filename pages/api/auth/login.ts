import { NextApiRequest, NextApiResponse } from "next";
import User, { IUser } from "../../../utils/models/user";
import ConnectDB from "../../../utils/mongodb";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await ConnectDB();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please enter all fields" });
    }

    const user: IUser | null = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(401).json({ success: false, message: "email or password is not correct" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: "email or password is not correct" });
    }

    const userData: Partial<IUser> = { ...user.toObject() };
    delete userData.password;

    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}