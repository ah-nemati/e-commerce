import { NextApiRequest, NextApiResponse } from "next";
import { readDB, writeDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  try {
    const { color, link, title, brand, category, price } = req.body;

    // validation
    if (!title || !price || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: "title, price, brand, category are required",
      });
    }

    const products = await readDB("products.json");

    const newProduct = {
      id: crypto.randomUUID(), // بهتر از Date.now
      title_fa: title,
      rating: {
        rate: 88,
        count: 535,
      },
      image: {
        url: link || "",
      },
      data_layer: {
        brand,
        category,
      },
      price,
      colors: color || [],
    };

    const updatedProducts = [...products, newProduct];

    await writeDB("products.json", updatedProducts);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error: any) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
}
