import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { ImageButton } from "../../components/Tools/ImageButton";

import google from "../../images/google.png";
import { Auth, Notify } from "../../Store/Actions";
import { validate } from "../../utils/validate";
import Input from "../../components/Tools/Input";
import { useState } from "react";

export default function Signin() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/signin", { email, password }).then((res) => {
      if (res.data.status === "error") {
        dispatch(Notify("error", validate.USER_AUTH_ERROR));
      } else {
        dispatch(
          Notify("success", email.split("@")[0] + validate.USER_AUTH_SUCCESS)
        );
        dispatch(Auth(res.data));
        localStorage.setItem("email", res.data.email);
        router.push("/");
      }
    });
  };

  return (
    <>
      <Head>
        <title>ورود به فروشگاه</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main
        className="bg-dark dark:bg-slate-900 dark:text-white min-h-screen  flex flex-col gap-8 justify-center
        items-center md:text-base text-sm"
      >
        <Link href={"/"} passHref>
          <h1 className="text-2xl cursor-pointer">فروشگاه</h1>
        </Link>
        <div className="bg-white dark:bg-slate-900 dark:text-white dark:border dark:border-slate-700 shadow-sm rounded-2xl py-6 px-12 flex flex-col w-11/12 md:w-[32rem] gap-4">
          <h1 className="md:text-2xl text-lg text-center text-gray-500 dark:text-white">
            ورود
          </h1>
          <ImageButton src={google} value="ورود با گوگل" />
          <div className="relative flex justify-center">
            <h3 className="text-xs text-gray-400 z-10 relative dark:bg-slate-900  bg-white px-3">
              یا ورود به حساب با
            </h3>
            <i className="absolute top-1/2 transform -translate-y-1/2 z-0 right-0 w-full flex border-t border-gray-500 border-opacity-30"></i>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" autoComplete="true">
            <label
              htmlFor={"email"}
              className="flex flex-col text-gray-600 dark:text-white text-sm gap-2"
            >
              <div className="flex justify-between">ایمیل</div>
              <div
                className="bg-dark dark:bg-slate-800 dark:text-white dark:border-none border flex flex-row p-2 text-base rounded-md 
          hover:border-blue-500"
              >
                <input
                  className="flex-1 outline-none bg-gray-100 dark:bg-slate-800 dark:text-white border-0"
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>
            </label>
            <Input
              data="password"
              label={"پسورد"}
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              jsx={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-gray-400 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              }
            />
            <button
              type="submit"
              className="bg-blue-500 dark:bg-sky-500 dark:hover:bg-sky-400 dark:hover:text-white dark:border-none hover:bg-white p-2 rounded-md text-white hover:border-blue-600 border hover:text-blue-600"
            >
              ورود
            </button>
          </form>
          <div className="text-center mt-6 text-gray-700 dark:text-white">
            آیا قبلا ثبت نام کرده اید؟
            <Link href={"/Auth/Signup"} passHref>
              <span className="text-blue-500">ثبت نام</span>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
