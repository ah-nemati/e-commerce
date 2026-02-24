import { NextApiRequest, NextApiResponse } from "next";
import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

ConnectDB();

export default async function getProduct(req: NextApiRequest, res: NextApiResponse) {
  const product = await products.find();
  if (product) {
    return res.status(200).json({ product });
  }
  return res.json({ status: "error" });
}
