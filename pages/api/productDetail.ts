import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

ConnectDB();

export default async function getproductDetail(req, res) {
  const { id } = req.body;
  const product = await products.find({ id });
  if (product) {
    return res.status(200).json({ product });
  }
  return res.json({ status: "error" });
}
