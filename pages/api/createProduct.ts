import { NextApiRequest, NextApiResponse } from "next";
import { randomUUID } from "crypto";
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

    if (!title || !price || !brand || !category) {
      return res.status(400).json({
        success: false,
        message: "title, price, brand, category are required",
      });
    }

    const products = await readDB("products.json");

    const imageUrls: string[] = (() => {
      if (!link) return [];

      if (Array.isArray(link)) {
        return link.filter(
          (url) =>
            typeof url === "string" &&
            (url.startsWith("http://") ||
              url.startsWith("https://") ||
              url.startsWith("/")),
        );
      }

      if (typeof link === "string") {
        return link.startsWith("http://") ||
          link.startsWith("https://") ||
          link.startsWith("/")
          ? [link]
          : [];
      }

      return [];
    })();

    const newProduct = {
      id: randomUUID(),
      title_fa: title,
      rating: {
        rate: 88,
        count: 535,
      },
      image: {
        url: imageUrls, // همیشه آرایه واقعی
      },
      data_layer: {
        brand,
        category,
      },
      price: Number(price),
      colors: Array.isArray(color) ? color : [],
    };

    const updatedProducts = [...products, newProduct];

    await writeDB("products.json", updatedProducts);

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Create product error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
