import { readDB, writeDB } from "../../utils/db";

export default async function Edit(req, res) {
  try {
    const { product } = req.body;
    const { id, colors, images, title_fa, data_layer, price } = product;

    const products = await readDB("products.json");

    const updatedProducts = products.map((p) =>
      p.id == id ? { ...p, title_fa, images, data_layer, price, colors } : p,
    );

    await writeDB(updatedProducts);

    return res.json({ success: "updated!" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
