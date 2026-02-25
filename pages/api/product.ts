import { NextApiRequest, NextApiResponse } from "next";
import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await ConnectDB();
    const product = await products.find({});
    return res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}