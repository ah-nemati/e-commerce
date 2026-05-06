import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { readDB } from "@/utils/db";
import { signToken } from "@/utils/auth";
import { setCookie } from "@/utils/cookie";

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

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const users = await readDB("users.json");

    const user = users.find((u: any) => u.email === email);

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // 👇 فقط اطلاعات مهم داخل token
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.setHeader("Set-Cookie", setCookie(token));

    const { password: _, ...safeUser } = user;

    return res.status(200).json({
      success: true,
      user: safeUser,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
