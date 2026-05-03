import { readDB } from "../../utils/db";

export default async function getproductDetail(req, res) {
  try {
    const { id } = req.query;

    const products = await readDB("products.json");
    const product = products.find((p) => p.id == id);

    if (product) {
      return res.status(200).json({ product });
    }

    return res.status(404).json({ status: "not found" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
