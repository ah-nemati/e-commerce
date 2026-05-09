import { NextApiRequest, NextApiResponse } from "next";
import { readDB, writeDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "PUT" && req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const body = req.body?.product || req.body;
    const { id, colors, image, title_fa, data_layer, price } = body;

    // validation
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required",
      });
    }

    const products = await readDB("products.json");

    const index = products.findIndex((p: any) => String(p.id) === String(id));

    if (index === -1) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = {
      ...products[index],
      title_fa,
      image,
      data_layer,
      price,
      colors,
    };

    const updatedProducts = [...products];
    updatedProducts[index] = updatedProduct;

    await writeDB("products.json", updatedProducts);

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
