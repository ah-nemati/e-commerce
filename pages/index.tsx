import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SetProduct } from "../Store/Actions";
import { useEffect } from "react";
import { Products } from "../components/Products";
import { AnyAction } from "redux";
import { State } from "../types/index";
import type { NextPage } from "next";

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const { products, filteredProducts } = useSelector((state: State) => state);
  useEffect(() => {
    axios
      .get("/api/product")
      .then((res) => dispatch(SetProduct(res?.data?.product) as unknown as AnyAction));
  }, [dispatch]);
  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-500">
      <Products product={filteredProducts?.length > 0 ? filteredProducts : products} />
    </div>
  );
};

export default Home;
