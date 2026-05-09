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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validateForm = () => {
    if (!form.email.trim()) {
      return "ایمیل الزامی است";
    }

    // EMAIL VALIDATION
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(form.email)) {
      return "فرمت ایمیل صحیح نیست";
    }

    if (!form.password.trim()) {
      return "رمز عبور الزامی است";
    }

    if (form.password.length < 6) {
      return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (form.password !== form.confirm) {
      return "تکرار رمز عبور صحیح نیست";
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

      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-slate-950">
        <div className="flex w-full max-w-md flex-col gap-6">
          {/* LOGO */}
          <Link
            href="/"
            className="text-center text-3xl font-extrabold text-blue-600"
          >
            فروشگاه
          </Link>

          {/* CARD */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            {/* HEADER */}
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                ایجاد حساب کاربری
              </h1>

              <p className="mt-2 text-sm text-gray-400">خوش اومدی 👋</p>
            </div>

            {/* GOOGLE */}
            <div className="mb-5 w-full">
              <ImageButton
                style={{
                  width: "100%",
                  justifyContent: "center",
                }}
                src={google.src}
                value="ثبت نام با گوگل"
              />
            </div>

            <Divider text="یا ثبت نام با ایمیل" />

            {/* FORM */}
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              {/* EMAIL */}
              <Input
                data="email"
                type="email"
                label="ایمیل"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                jsx={null}
              />

              {/* PASSWORD */}
              <Input
                data="password"
                type={showPassword ? "text" : "password"}
                label="رمز عبور"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                jsx={
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    <EyeIcon />
                  </div>
                }
              />

              {/* CONFIRM PASSWORD */}
              <Input
                data="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                label="تکرار رمز عبور"
                value={form.confirm}
                onChange={(e) => handleChange("confirm", e.target.value)}
                jsx={
                  <div
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="cursor-pointer"
                  >
                    <EyeIcon />
                  </div>
                }
              />

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 rounded-xl bg-blue-600 font-medium text-white transition-all duration-200 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "در حال ثبت نام..." : "ایجاد حساب"}
              </button>
            </form>

            {/* LOGIN LINK */}
            <div className="mt-8 border-t border-gray-100 pt-5 text-center dark:border-slate-800">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                قبلاً حساب ساخته‌اید؟
              </p>

              <Link
                href="/Auth/Signin"
                className="mt-3 inline-flex items-center justify-center rounded-xl border border-blue-200 px-5 py-2 text-sm font-medium text-blue-600 transition-all duration-200 hover:bg-blue-50 dark:border-blue-900 dark:text-blue-400 dark:hover:bg-blue-950/40"
              >
                ورود به حساب
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
