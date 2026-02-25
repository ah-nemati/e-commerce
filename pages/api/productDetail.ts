import { NextApiRequest, NextApiResponse } from "next";
import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await ConnectDB();
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const product = await products.findOne({ id });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}