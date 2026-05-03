import { readDB, writeDB } from "../../utils/db";

export default async function Delete(req, res) {
  try {
    const { id } = req.body;

    const products = await readDB("products.json");

    const filtered = products.filter((p) => p.id != id);

    await writeDB(filtered);

    return res.json({ success: "deleted!" });
  } catch (error) {
    return res.status(500).json({ status: "error" });
  }
}
