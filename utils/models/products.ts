
import mongoose, { Document, Model } from "mongoose";

const Schema = mongoose.Schema;

export interface IProduct extends Document {
  id: number;
  Quanity: number;
  title_fa: string;
  data_layer: {
    brand: string;
    category: string;
  };
  images: {
    url: string[];
  };
  rating: {
    rate: number;
    count: number;
  };
  price: number;
  colors: string[];
}

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  Quanity: { type: Number, default: 1 },
  title_fa: {
    type: String,
    required: true,
  },
  data_layer: {
    brand: { type: String },
    category: { type: String },
  },
  images: {
    url: { type: [String], required: true },
  },
  rating: {
    rate: { type: Number, default: 0 },
    count: { type: Number, default: 0 },
  },
  price: { type: Number, required: true },
  colors: { type: [String] },
});

const Product: Model<IProduct> =
  mongoose.models.products || mongoose.model<IProduct>("products", productSchema);

export default Product;
