import { NextApiRequest, NextApiResponse } from "next";
import { readDB } from "../../utils/db";

type Product = {
  title_fa: string;
  price: number;
  rating: { rate: number; count: number };
  data_layer: { category: string; brand: string };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const products: Product[] = await readDB("products.json");
    const {
      search = "",
      category = "",
      brand = "",
      minPrice = "",
      maxPrice = "",
      sort = "visited",
      page = "1",
      limit = "10",
    } = req.query;

    let result = [...products];

    if (search) {
      const q = String(search).toLowerCase();
      result = result.filter((p) => p.title_fa?.toLowerCase().includes(q));
    }

    if (category) {
      if (category === "other") {
        result = result.filter(
          (p) =>
            p.data_layer?.category !== "گوشی موبایل" &&
            p.data_layer?.category !== "لپ تاپ و الترابوک",
        );
      } else {
        result = result.filter((p) => p.data_layer?.category === category);
      }
    }

    if (brand) {
      const brandList = String(brand).split(",").filter(Boolean);
      result = result.filter((p) => brandList.includes(p.data_layer?.brand));
    }

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    const sorted = [...result];
    switch (sort) {
      case "price_asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        sorted.sort((a, b) => b.rating.count - a.rating.count);
    }

    const start = (Number(page) - 1) * Number(limit);
    const paginated = sorted.slice(start, start + Number(limit));

    return res.status(200).json({
      success: true,
      total: sorted.length,
      products: paginated,
      hasMore: start + Number(limit) < sorted.length,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Internal Server Error",
      });
  }
}
