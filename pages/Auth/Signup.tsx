import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { ImageButton } from "../../components/Tools/ImageButton";
import Input from "../../components/Tools/Input";
import google from "../../images/google.png";
import { Notify } from "../../Store/Actions";
import { NextPage } from "next";

const Signup: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [re_password, setRe_password] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== re_password) {
      dispatch(Notify("error", "تکرار رمز اشتباه است"));
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      dispatch(Notify("error", "رمز عبور باید حداقل ۶ کاراکتر باشد"));
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post("/api/signup", { email, password });

      if (res.data.success) {
        dispatch(Notify("success", "ثبت نام با موفقیت انجام شد"));
        router.push("/Auth/Signin");
      } else {
        dispatch(Notify("error", res.data.message || "خطا در ثبت نام"));
      }
    } catch (error: any) {
      if (error.response?.status === 409) {
        dispatch(Notify("error", "ایمیل وارد شده قبلا ثبت شده است"));
      } else if (error.response?.data?.message) {
        dispatch(Notify("error", error.response.data.message));
      } else {
        dispatch(Notify("error", "خطای سرور، لطفا دوباره تلاش کنید"));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ثبت نام در فروشگاه</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <main
        className="bg-dark dark:bg-slate-900 dark:text-white min-h-screen flex flex-col justify-center items-center gap-8"
        dir="rtl"
      >
        <Link href={"/"} passHref>
          <h1 className="text-2xl cursor-pointer dark:text-white">فروشگاه</h1>
        </Link>

        <div className="bg-white dark:bg-slate-900 dark:text-white dark:border-slate-700 dark:border shadow-sm rounded-2xl py-6 px-12 flex flex-col md:m-0 mx-4 w-full md:w-[32rem] gap-4">
          <h1 className="md:text-2xl text-lg text-center text-gray-500 dark:text-white">
            ثبت نام
          </h1>
          <ImageButton src={google.src} value="ثبت نام با گوگل" />
          <div className="relative flex justify-center">
            <h3 className="text-xs text-gray-500 z-10 relative dark:bg-slate-900 bg-white px-3">
              یا ثبت نام با
            </h3>
            <i className="absolute top-1/2 transform -translate-y-1/2 z-0 right-0 w-full flex border-t border-gray-500 border-opacity-30"></i>
          </div>
          <form
            className="flex flex-col gap-8 md:text-base text-sm"
            onSubmit={handleSubmit}
          >
            <Input
              data="email"
              label={"ایمیل"}
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              jsx={null}
            />
            <Input
              data="password"
              label={"پسورد"}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
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
            <Input
              data="password"
              value={re_password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setRe_password(e.target.value)
              }
              label={" تکرار پسورد"}
              jsx={null}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 dark:bg-sky-500 dark:hover:bg-sky-400 dark:hover:text-white dark:border-none hover:bg-white p-2 rounded-md text-white hover:border-blue-600 border hover:text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "در حال ثبت نام..." : "ثبت نام"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;