import { NextApiRequest, NextApiResponse } from "next";
import { readDB } from "../../utils/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const products = await readDB("products.json");
    let result = [...products];

    const {
      search,
      category,
      brand,
      minPrice,
      maxPrice,
      sort,
      page = "1",
      limit = "10",
    } = req.query;

    if (search) {
      result = result.filter((p) =>
        p.title_fa?.toLowerCase().includes(String(search).toLowerCase()),
      );
    }

    if (category && category !== "") {
      result = result.filter((p) => p.data_layer?.category === category);
    }

    if (brand && brand !== "") {
      const brandList = String(brand).split(",");
      result = result.filter((p) => brandList.includes(p.data_layer?.brand));
    }

    if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
    if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));

    switch (sort) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      default:
        result.sort((a, b) => b.rating.count - a.rating.count);
        break;
    }

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const start = (pageNum - 1) * limitNum;
    const paginated = result.slice(start, start + limitNum);

    return res.status(200).json({
      success: true,
      total: result.length,
      products: paginated,
      hasMore: start + limitNum < result.length,
    });
  } catch (error) {
    return res.status(500).json({ success: false });
  }
}
