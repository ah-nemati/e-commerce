import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorProducts } from "../../components/Tools/ColorProducts";
import PersianNumber from "../../Hooks/PersianNumber";
import { AddToCart, Notify } from "../../Store/Actions";
import truck from "./../../images/truck.png";

interface RootState {
  cart: any[];
}

const Product = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [data, setdata] = useState(null);
  const { id } = router.query;
  const cartProduct = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    if (id) {
      axios
        .post("/api/productDetail", { id })
        .then((res) => setdata(res.data.product[0]));
    }
  }, [id]);

  const handleAddToCart = () => {
    const duble = cartProduct.filter((item) => item.id === data.id);
    if (duble.length > 0) {
      dispatch(Notify("error", "کالای مورد نظر در سبد خرید موجود است !"));
    } else {
      dispatch(AddToCart(data));
      dispatch(Notify("success", "کالای مورد نظر به سبد خرید افزوده شد"));
    }
  };

  return (
    <div className="mt-4">
      {data ? (
        <div className="flex flex-col px-8 gap-4">
          <div className="flex text-gray-500 text-sm gap-2 dark:bg-slate-900 dark:text-white bg-white p-4 rounded-md">
            <Link href={"/"} passHref>
              <button className="text-orange-500">فروشگاه</button>
            </Link>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </span>
            <Link href={"#"} passHref>
              {data.data_layer.category}
            </Link>{" "}
          </div>
          <div className="flex w-full gap-4 mb-8 md:flex-nowrap flex-wrap">
            <div className="flex flex-col md:w-2/3 w-full gap-4">
              <div className="flex dark:bg-slate-900 dark:text-white dark:border dark:border-slate-700 bg-white p-4 rounded-md gap-6">
                <div className="flex flex-col w-1/3">
                  <span className="md:max-w-[24vw]">
                    <Image
                      priority
                      src={data.images.url[0]}
                      width="300"
                      height="300"
                      alt="product"
                    />
                  </span>
                </div>
                <div className="flex flex-col w-2/3">
                  <span className="break-words lg:text-xl md:text-base text-xs leading-6">
                    {data.title_fa}
                  </span>
                  <div className="flex">
                    <div className="flex flex-col w-full">
                      <hr className="my-6" />
                      <div className="flex gap-1 text-sm items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-yellow-400 h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{(data.rating.rate * 5) / 100}</span>
                        <span className="mx-2 text-gray-600 text-xs">
                          ({data.rating.count} دیدگاه)
                        </span>
                      </div>
                      <div className="flex mt-4 items-center gap-1">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 stroke-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                            />
                          </svg>
                        </span>
                        <span className="text-gray-500 md:text-sm text-xs leading-5">
                          {data.rating.rate}% از خریداران، این کالا را پیشنهاد
                          کرده اند
                        </span>
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 stroke-slate-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </span>
                      </div>
                      <ColorProducts colors={data.colors} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex dark:bg-slate-900 dark:text-white bg-white p-4 md:text-base text-sm">
                <div className="flex flex-col w-full gap-4">
                  <h3 className="border-b-2 max-w-fit border-red-600 mb-6">
                    تجربه های خریداران
                  </h3>
                  <div className="flex flex-col gap-4">
                    <div className="pl-4">
                      <div className="flex justify-between">
                        <div className="flex gap-4 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 stroke-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>فروشگاه</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          ۷ اردیبهشت ۱۴۰۱
                        </span>
                      </div>
                      <p className="mt-6 pr-8 text-gray-600 text-sm">
                        خیلی عالیست
                      </p>
                      <div className="flex justify-end text-gray-600 gap-2">
                        <span>آیا این نظر مفید بود ؟</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>{" "}
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="flex flex-col gap-4">
                    <div className="pl-4">
                      <div className="flex justify-between">
                        <div className="flex gap-4 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 stroke-slate-700"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>فروشگاه</span>
                        </div>
                        <span className="text-gray-500 text-sm">
                          ۷ اردیبهشت ۱۴۰۱
                        </span>
                      </div>
                      <p className="mt-6 pr-8 text-gray-600 text-sm">
                        خیلی عالیست
                      </p>
                      <div className="flex justify-end text-gray-600 gap-2">
                        <span>آیا این نظر مفید بود ؟</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 cursor-pointer"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                          />
                        </svg>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* add to cart section */}
            <div className="flex flex-col md:w-1/3 w-full h-fit dark:bg-slate-900 dark:text-white dark:border dark:border-slate-700 bg-white rounded sticky top-36 p-6 mb-10">
              <div className="flex flex-col gap-4">
                <div className="flex items-center">
                  <span className="w-10 h-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-orange-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  <span>فروشگاه</span>
                </div>
                <div className="flex gap-1 text-xs px-10">
                  <span> عملکرد </span>
                  <span className="text-green-500">عالی</span>
                </div>
                <hr />
                <div className="flex gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  <span className="text-sm">گارانتی ۱۸ ماهه</span>
                </div>
                <hr />
                <div className="flex gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 stroke-blue-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  <span>موجود در انبار فروشگاه</span>
                </div>
                <div className="flex items-center gap-2 px-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-md"></span>
                  <span className="w-5 h-5 mr-6">
                    <Image
                      src={truck}
                      width="300"
                      height="300"
                      alt="truck"
                    />
                  </span>
                  <span className="text-gray-500 text-xs">ارسال فروشگاه</span>
                </div>
                <hr />
                <div className="flex flex-col gap-4">
                  <span className="flex justify-end">
                    {data.price && PersianNumber(data.price)} تومان
                  </span>
                  <span className="text-red-500 text-sm">
                    تنها 1 عدد در انبار فروشگاه مانده
                  </span>
                  <button
                    className="bg-orange-500 p-3 text-white rounded-md text-sm"
                    onClick={handleAddToCart}
                  >
                    اضافه به سبد خرید
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[50vh] animate-pulse"></div>
      )}
    </div>
  );
};

export default Product;
