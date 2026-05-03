import { NextApiRequest, NextApiResponse } from "next";
import { readDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // فقط GET
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const products = await readDB("products.json");

    return res.status(200).json({
      success: true,
      products, // چون لیست هست، نه یک product
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
