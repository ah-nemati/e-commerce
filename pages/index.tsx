import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Store/Actions";
import { useEffect } from "react";
import { Products } from "../components/Products";
import { AnyAction } from "redux";

interface RootState {
  product: any;
  filter: any;
}

export default function Home() {
  const dispatch = useDispatch();
  const { product, filter } = useSelector((state: RootState) => state);
  useEffect(() => {
    axios.get("/api/product").then((res) => dispatch(Product(res.data) as unknown as AnyAction));
  }, [dispatch]);
  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-500">
      <Products product={filter.length > 0 ? filter : product.product} />
    </div>
  );
}
