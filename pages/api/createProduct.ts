import products from "../../utils/models/products";
import ConnectDB from "../../utils/mongodb";

ConnectDB();

export default async function Create(req, res) {
  const date=new Date()
  const { color, link, title, brand, category, price } = req.body;
  const newProduct = new products({
    id: date.getTime(),
    title_fa: title,
    images: { url: link },
    data_layer: {
      brand: brand,
      category: category,
    },
    price: price,
    colors: color,
  });

  newProduct.save();
  return res.json({ success: "loged in !" });
}
