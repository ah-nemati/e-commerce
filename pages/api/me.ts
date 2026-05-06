import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken } from "@/utils/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json(null);
    }

    const user = verifyToken(token);

    return res.status(200).json(user);
  } catch {
    return res.status(401).json(null);
  }
}
