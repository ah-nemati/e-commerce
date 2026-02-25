import { NextApiRequest, NextApiResponse } from "next";
import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT" && req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await ConnectDB();
    const data = req.body.product || req.body;
    const { id, colors, images, title_fa, data_layer, price } = data;

    if (!id) {
      return res.status(400).json({ success: false, message: "ID is required" });
    }

    const updatedProduct = await products.findOneAndUpdate(
      { id },
      {
        title_fa,
        images,
        data_layer,
        price,
        colors,
      },
      {
        new: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({ success: true, message: "updated !" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
}