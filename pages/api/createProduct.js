import { readDB, writeDB } from "../../utils/db";

export default async function Create(req, res) {
  try {
    const { color, link, title, brand, category, price } = req.body;

    const products = await readDB("products.json");

    const newProduct = {
      id: Date.now(),
      title_fa: title,
      images: { url: link },
      data_layer: {
        brand,
        category,
      },
      price,
      colors: color,
    };

    const updated = [...products, newProduct];

    await writeDB(updated);

    return res.status(201).json({ success: "created!" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
