import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../utils/models/products"; 
import connectDB from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();

    const { color, link, title, brand, category, price } = req.body;

    if (!title || !price) {
      return res.status(400).json({ success: false, message: "عنوان و قیمت الزامی است" });
    }

     const newProduct = new Product({
      title_fa: title,
      images: { url: link },
      data_layer: {
        brand: brand,
        category: category,
      },
      price: price,
      colors: color,
    });

    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error: any) {
    console.error("خطا در ساخت محصول:", error);
    return res.status(500).json({ success: false, message: error.message || "خطای سرور" });
  }
}