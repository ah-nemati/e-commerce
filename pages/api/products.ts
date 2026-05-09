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
      const q = String(search).toLowerCase().trim();
      result = result.filter((p) => p.title_fa?.toLowerCase().includes(q));
    }

    if (category && String(category).trim() !== "") {
      const cat = String(category).trim();

      result = result.filter((p) => {
        const productCat = String(p.data_layer?.category || "").trim();

        if (cat === "لپ تاپ و الترابوک") {
          return productCat.includes("لپ") || productCat.includes("لپ‌تاپ");
        }

        return productCat === cat;
      });
    }

    if (brand) {
      const brandList = String(brand)
        .split(",")
        .map((b) => b.trim())
        .filter(Boolean);

      if (brandList.length > 0) {
        result = result.filter((p) =>
          brandList.includes(String(p.data_layer?.brand || "").trim()),
        );
      }
    }

    const minP = minPrice ? Number(minPrice) : 0;
    const maxP = maxPrice ? Number(maxPrice) : Infinity;

    if (minPrice || maxPrice) {
      result = result.filter((p) => {
        const price = Number(p.price);
        return price >= minP && price <= maxP;
      });
    }

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

    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const start = (pageNum - 1) * limitNum;

    const paginated = sorted.slice(start, start + limitNum);

    return res.status(200).json({
      success: true,
      total: sorted.length,
      products: paginated,
      hasMore: start + limitNum < sorted.length,
      page: pageNum,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}
