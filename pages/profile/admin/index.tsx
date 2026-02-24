import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../../components/Tools/ProfileNav";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { DeleteProduct, Notify } from "../../../Store/Actions";
import { useRouter } from "next/router";
import axios from "axios";

const Index = () => {
  const { product } = useSelector((state: any) => state);
  const { push } = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex-col dark:text-white text-gray-600 rounded bg-white dark:bg-slate-600 sm:w-8/12 justify-center items-center gap-1 p-2">
        <Link
          href={"/profile/admin/create"}
          className="flex flex-row text-orange-500 rounded my-6 gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>ایجاد محصول جدید</span>
        </Link>
        {product?.product?.map((prod: any, index: number) => (
          <div
            className="flex flex-row border w-full p-2 rounded"
            key={prod.id}
          >
            <span className="flex-col justify-center">{index + 1}</span>
            <Image
              src={prod.images.url[0]}
              width={100}
              height={100}
              alt={prod.images.url[0]}
              className="pr-4 w-2/12 rounded"
            />
            <span className="flex flex-col justify-center w-9/12 px-6 text-center items-center">
              {prod.title_fa}
            </span>
            <div className="flex flex-row justify-center w-1/12 gap-2">
              {/* edit button */}
              <Link
                href={`/profile/admin/edit/${prod.id}`}
                className="flex flex-col hover:text-green-500 justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                  />
                </svg>
              </Link>
              {/* delete button */}
              <button
                className="hover:text-red-500"
                onClick={() => {
                  if (confirm("آیا مطمن به حذف محصول هستید ؟") == true) {
                    axios.post("/api/deleteProduct/", { id: prod.id });
                    push("/");
                    dispatch(Notify("success", "محصول با موفقیت حذف شد"));
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
