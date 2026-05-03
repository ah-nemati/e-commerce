import { NextApiRequest, NextApiResponse } from "next";
import { readDB, writeDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "DELETE" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { id } = req.body;

    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const products = await readDB("products.json");

    const productExists = products.some(
      (p: any) => String(p.id) === String(id),
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const filteredProducts = products.filter(
      (p: any) => String(p.id) !== String(id),
    );

    await writeDB("products.json", filteredProducts);

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
