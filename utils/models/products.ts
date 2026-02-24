import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchma = new Schema({
  id: {
    type: Number,
  },
  Quanity: { type: Number, default: 1 },
  title_fa: {
    type: String,
  },
  data_layer: {
    brand: { type: String },
    category: { type: String },
  },
  images: {
    url: { type: Array },
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  price: { type: Number },
  colors: { type: Array },
});

export default mongoose.models.products ||
  mongoose.model("products", productSchma);
