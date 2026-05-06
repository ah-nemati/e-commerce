import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { useState, FormEvent } from "react";
import { NextPage } from "next";

import { ImageButton } from "../../components/Tools/ImageButton";
import Input from "../../components/Tools/Input";
import google from "../../images/google.png";
import { Notify } from "../../Store/Actions";
import Divider from "@/components/Tools/Divider";
import EyeIcon from "@/components/Tools/EyeIcon";

const Signup: NextPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });

  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (form.password !== form.confirm) {
      return "تکرار رمز اشتباه است";
    }
    if (form.password.length < 6) {
      return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      dispatch(Notify("error", error));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(Notify("error", data.message || "خطا در ثبت نام"));
        return;
      }

      dispatch(Notify("success", "ثبت نام با موفقیت انجام شد"));
      router.push("/Auth/Signin");
    } catch {
      dispatch(Notify("error", "خطای سرور"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>ثبت نام در فروشگاه</title>
      </Head>

      <main className="bg-dark dark:bg-slate-900 min-h-screen flex flex-col justify-center items-center gap-8">
        <Link href="/">
          <h1 className="text-2xl cursor-pointer">فروشگاه</h1>
        </Link>

        <div className="bg-white dark:bg-slate-900 dark:border dark:border-slate-700 shadow-sm rounded-2xl py-6 px-12 flex flex-col w-full md:w-[32rem] gap-4">
          <h1 className="text-center text-gray-500 dark:text-white">ثبت نام</h1>

          <ImageButton src={google.src} value="ثبت نام با گوگل" />

          <Divider text="یا ثبت نام با" />

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

            <Input
              data="password"
              label="تکرار پسورد"
              value={form.confirm}
              onChange={(e) => handleChange("confirm", e.target.value)}
              jsx={null}
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 p-2 rounded-md text-white disabled:opacity-50"
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
