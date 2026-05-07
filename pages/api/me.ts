import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ user: null });
    }

    const user = await verifyToken(token);

    return res.status(200).json({
      user,
    });
  } catch {
    return res.status(401).json({
      user: null,
    });
  }
}
