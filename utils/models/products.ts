export interface IProduct extends Document {
  id: number;
  title_fa: string;
  data_layer: {
    brand: string;
    category: string;
  };
  image: {
    url: string[];
  };
  rating: {
    rate: number;
    count: number;
  };
  price: number;
  colors: string[];
}
