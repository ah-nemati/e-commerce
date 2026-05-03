import { readDB } from "../../utils/db";

export default async function getProduct(req, res) {
  try {
    const products = await readDB("products.json");
    return res.status(200).json({ product: products });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
