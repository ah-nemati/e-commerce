import { NextApiRequest, NextApiResponse } from "next";
import { readDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const products = await readDB("products.json");

    const product = products.find((p: any) => String(p.id) === String(id));

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
