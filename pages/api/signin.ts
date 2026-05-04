import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { readDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // فقط POST
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
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

    // خواندن از JSON
    const users = await readDB("users.json");

    const findUser = users.find((user: any) => user.email === email);

    if (!findUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // بررسی پسورد
    const isPasswordCorrect = await bcrypt.compare(
      password,
      findUser.password || "",
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // حذف password از خروجی
    const { password: _, ...userWithoutPassword } = findUser;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
