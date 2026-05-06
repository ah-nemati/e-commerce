import { NextApiRequest, NextApiResponse } from "next";
import { clearCookie } from "@/utils/cookie";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", clearCookie());

  return res.status(200).json({ success: true });
}
