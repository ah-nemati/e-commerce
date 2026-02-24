import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";
ConnectDB();
export default async function Delete(req, res) {
  const { id } = await req?.body;
  await products.deleteOne({ id });
  return res.json({ success: "updated !" });
}
