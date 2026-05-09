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
import { validate } from "../../utils/validate";
import Divider from "@/components/Tools/Divider";
import { dispatchAuthChange } from "@/hooks/useUser";

const Signin: NextPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (key: "email" | "password", value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validateForm = () => {
    if (!form.email.trim()) return "ایمیل الزامی است";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      return "فرمت ایمیل صحیح نیست";
    if (!form.password.trim()) return "رمز عبور الزامی است";
    if (form.password.length < 6) return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const error = validateForm();
    if (error) {
      dispatch(Notify("error", error));
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(Notify("error", data.message || validate.USER_AUTH_ERROR));
        return;
      }

      dispatch(
        Notify(
          "success",
          form.email.split("@")[0] + validate.USER_AUTH_SUCCESS,
        ),
      );

      // ✅ Notify all useUser instances to refetch — Profile updates immediately
      dispatchAuthChange();

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

      <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10 dark:bg-slate-950">
        <div className="flex w-full max-w-md flex-col gap-6">
          {/* LOGO */}
          <Link
            href="/"
            className="text-center text-3xl font-extrabold text-orange-500"
          >
            فروشگاه
          </Link>

          {/* CARD */}
          <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-100 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/20">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                ورود به حساب
              </h1>
              <p className="mt-2 text-sm text-gray-400">خوش برگشتی 👋</p>
            </div>

            <div className="mb-5 w-full">
              <ImageButton
                style={{ width: "100%", justifyContent: "center" }}
                src={google.src}
                value="ورود با گوگل"
              />
            </div>

            <Divider text="یا ورود با ایمیل" />

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
              <Input
                data="email"
                type="email"
                label="ایمیل"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
              <Input
                data="password"
                type="password"
                label="رمز عبور"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />

              <button
                type="submit"
                disabled={loading}
                className="mt-2 h-12 rounded-xl bg-orange-500 font-medium text-white transition-all duration-200 hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "در حال ورود..." : "ورود به حساب"}
              </button>
            </form>

            <div className="mt-8 border-t border-gray-100 pt-5 text-center dark:border-slate-800">
              <p className="text-sm text-gray-500 dark:text-slate-400">
                هنوز حساب کاربری ندارید؟
              </p>
              <Link
                href="/Auth/Signup"
                className="mt-3 inline-flex items-center justify-center rounded-xl border border-orange-200 px-5 py-2 text-sm font-medium text-orange-500 transition-all duration-200 hover:bg-orange-50 dark:border-orange-900 dark:text-orange-400 dark:hover:bg-orange-950/40"
              >
                ثبت نام در سایت
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signin;
