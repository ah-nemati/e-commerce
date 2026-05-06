import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";
import { NextPage } from "next";

import { ImageButton } from "../../components/Tools/ImageButton";
import Input from "../../components/Tools/Input";
import google from "../../images/google.png";
import { Auth, Notify } from "../../Store/Actions";
import { validate } from "../../utils/validate";
import Divider from "@/components/Tools/Divider";
import EyeIcon from "@/components/Tools/EyeIcon";

const Signin: NextPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(Notify("error", validate.USER_AUTH_ERROR));
        return;
      }

      dispatch(
        Notify(
          "success",
          form.email.split("@")[0] + validate.USER_AUTH_SUCCESS,
        ),
      );

      dispatch(Auth(data.user));

      router.push("/");
    } catch {
      dispatch(Notify("error", "خطا در ارتباط با سرور"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ورود به فروشگاه</title>
      </Head>

      <main className="bg-dark dark:bg-slate-900 dark:text-white min-h-screen flex flex-col gap-8 justify-center items-center">
        <Link href="/">
          <h1 className="text-2xl cursor-pointer">فروشگاه</h1>
        </Link>

        <div className="bg-white dark:bg-slate-900 dark:border dark:border-slate-700 shadow-sm rounded-2xl py-6 px-12 flex flex-col w-11/12 md:w-[32rem] gap-4">
          <h1 className="md:text-2xl text-lg text-center text-gray-500 dark:text-white">
            ورود
          </h1>

          <ImageButton src={google.src} value="ورود با گوگل" />

          <Divider text="یا ورود به حساب با" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              data="email"
              label="ایمیل"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              jsx={null}
            />

            <Input
              data="password"
              label="پسورد"
              value={form.password}
              onChange={(e) => handleChange("password", e.target.value)}
              jsx={<EyeIcon />}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-white p-2 rounded-md text-white hover:border-blue-600 border hover:text-blue-600 disabled:opacity-50"
            >
              {loading ? "در حال ورود..." : "ورود"}
            </button>
          </form>
          {/* 
          <AuthFooter
            text="آیا قبلا ثبت نام نکرده اید؟"
            link="/Auth/Signup"
            linkText="ثبت نام"
          /> */}
        </div>
      </main>
    </>
  );
};

export default Signin;
