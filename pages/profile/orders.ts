import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../components/Tools/ProfileNav";
import { CartItem } from "../../components/Tools/CartItem";

const Orders = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div className="sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex-col text-gray-600 dark:text-white rounded bg-white dark:bg-slate-600 min-h-[40vh] sm:w-8/12 justify-center items-center gap-1">
        {cart.length > 0 ? (
          cart.map((item) => (
            <CartItem
              cartProduct={cart}
              key={item.id}
              product={item}
              dispatch={dispatch}
            />
          ))
        ) : (
          <span>هیچ سفارشی موجود نمی باشد.</span>
        )}
      </div>
    </div>
  );
};

export default Orders;
