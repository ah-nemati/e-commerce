import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddToCart, Notify } from "../../Store/Actions";
import { State, ProductType } from "../../types";
import PersianNumber from "../../hooks/PersianNumber";

const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg
    viewBox="0 0 20 20"
    className={`w-4 h-4 ${filled ? "text-amber-400" : "text-gray-200 dark:text-slate-600"}`}
    fill="currentColor"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const TrustBadge = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700">
    <div className="w-9 h-9 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-gray-800 dark:text-white">
        {title}
      </p>
      <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
        {subtitle}
      </p>
    </div>
  </div>
);

const RatingBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-3 text-xs">
    <span className="text-gray-500 dark:text-slate-400 w-16 shrink-0 text-right">
      {label}
    </span>
    <div className="flex-1 h-1.5 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
      <div
        className="h-full bg-amber-400 rounded-full transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
    <span className="text-gray-400 dark:text-slate-500 w-8">{value}%</span>
  </div>
);

const MOCK_REVIEWS = [
  {
    id: 1,
    author: "علی رضایی",
    rating: 5,
    date: "۱۴۰۳/۰۹/۱۵",
    title: "کیفیت عالی",
    body: "محصول کاملاً مطابق توضیحات بود. بسته‌بندی مناسب و ارسال سریع.",
    verified: true,
  },
  {
    id: 2,
    author: "سارا محمدی",
    rating: 4,
    date: "۱۴۰۳/۰۸/۲۲",
    title: "پیشنهاد می‌کنم",
    body: "از خرید راضی هستم. فقط ارسال کمی طول کشید ولی کیفیت محصول خوب بود.",
    verified: true,
  },
  {
    id: 3,
    author: "محمد کریمی",
    rating: 5,
    date: "۱۴۰۳/۰۷/۰۵",
    title: "بهترین انتخاب",
    body: "دقیقاً همان چیزی که می‌خواستم. قیمت هم مناسب است.",
    verified: false,
  },
];

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const cart = useSelector((state: State) => state.cart);

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"specs" | "reviews" | "shipping">(
    "specs",
  );
  const [imageZoomed, setImageZoomed] = useState(false);

  const isInCart = useMemo(
    () => cart.some((item) => item.id === product?.id),
    [cart, product],
  );

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get<{ product: ProductType }>("/api/productDetail", {
        params: { id },
      })
      .then((res) => {
        const p = res.data.product ?? null;
        setProduct(p);
        if (p?.colors?.length) setSelectedColor(p.colors[0].hex_code);
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (isInCart) {
      dispatch(Notify("error", "کالای مورد نظر در سبد خرید موجود است!"));
      return;
    }
    dispatch(
      AddToCart({ ...product, id: String(product.id), Quantity: quantity }),
    );
    dispatch(Notify("success", "کالا به سبد خرید افزوده شد"));
  };

  const ratingStars = product ? Math.round((product.rating.rate * 5) / 100) : 0;
  const images = product?.image?.url ?? [];

  if (loading) {
    return (
      <div className="mt-4 px-4 md:px-8 animate-pulse">
        <div className="h-8 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4 w-64" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-2/3 flex flex-col gap-4">
            <div className="h-96 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
          </div>
          <div className="md:w-1/3">
            <div className="h-80 bg-gray-100 dark:bg-slate-800 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-16 h-16 opacity-30"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
        <p className="text-lg font-medium text-gray-500 dark:text-slate-400">
          محصول یافت نشد
        </p>
        <Link
          href="/"
          className="text-sm text-orange-500 hover:text-orange-600 underline underline-offset-4"
        >
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  return (
    <div dir="rtl" className="mt-4 px-4 md:px-8 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-400 dark:text-slate-400 bg-white dark:bg-slate-900 px-4 py-3 rounded-xl mb-4 border border-gray-100 dark:border-slate-800">
        <Link
          href="/"
          className="text-orange-500 hover:text-orange-600 transition-colors font-medium"
        >
          فروشگاه
        </Link>
        <span className="text-gray-300 dark:text-slate-600">›</span>
        <span className="text-gray-500 dark:text-slate-400">
          {product.data_layer?.category}
        </span>
        <span className="text-gray-300 dark:text-slate-600">›</span>
        <span className="text-gray-700 dark:text-white truncate max-w-xs">
          {product.title_fa}
        </span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-5">
        {/* RIGHT — Image + Info */}
        <div className="flex flex-col lg:w-2/3 gap-5">
          {/* Product Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Image Gallery */}
              <div className="md:w-5/12 p-6 flex flex-col gap-3">
                <div
                  className="relative aspect-square rounded-xl overflow-hidden bg-gray-50 dark:bg-slate-800 cursor-zoom-in group"
                  onClick={() => setImageZoomed(!imageZoomed)}
                >
                  <Image
                    src={images[selectedImage] || images[0]}
                    fill
                    alt={product.title_fa}
                    className="object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                    priority
                  />
                  <div className="absolute top-3 right-3">
                    <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg">
                      ویژه
                    </span>
                  </div>
                </div>

                {images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {images.map((url, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                          selectedImage === i
                            ? "border-orange-500 shadow-sm shadow-orange-200"
                            : "border-gray-100 dark:border-slate-700 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={url}
                          fill
                          alt=""
                          className="object-contain p-1"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="md:w-7/12 p-6 flex flex-col gap-5 border-t md:border-t-0 md:border-r border-gray-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-2.5 py-1 rounded-lg">
                      {product.data_layer?.brand}
                    </span>
                    <span className="text-xs text-gray-400 dark:text-slate-500">
                      {product.data_layer?.category}
                    </span>
                  </div>
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-7">
                    {product.title_fa}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3 pb-4 border-b border-gray-100 dark:border-slate-800">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} filled={s <= ratingStars} />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-white">
                    {((product.rating.rate * 5) / 100).toFixed(1)}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-slate-500">
                    ({product.rating.count} دیدگاه)
                  </span>
                  <span className="mr-auto text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-0.5 rounded-md">
                    {product.rating.rate}% پیشنهاد خرید
                  </span>
                </div>

                {/* Colors */}
                {product.colors?.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2.5">
                      رنگ‌بندی:{" "}
                      <span className="text-gray-800 dark:text-white">
                        {
                          product.colors.find(
                            (c) => c.hex_code === selectedColor,
                          )?.title
                        }
                      </span>
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color.id}
                          onClick={() => setSelectedColor(color.hex_code)}
                          title={color.title}
                          className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                            selectedColor === color.hex_code
                              ? "border-orange-500 scale-110 shadow-md"
                              : "border-transparent hover:border-gray-300 hover:scale-105"
                          }`}
                          style={{ backgroundColor: color.hex_code }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-2.5">
                    تعداد
                  </p>
                  <div className="flex items-center gap-0 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden w-fit">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-lg font-medium"
                    >
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-gray-800 dark:text-white border-x border-gray-200 dark:border-slate-700 h-10 flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-lg font-medium"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Stock */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    موجود در انبار
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 overflow-hidden">
            <div className="flex border-b border-gray-100 dark:border-slate-800">
              {(
                [
                  { key: "specs", label: "مشخصات فنی" },
                  { key: "reviews", label: `نظرات (${MOCK_REVIEWS.length})` },
                  { key: "shipping", label: "ارسال و گارانتی" },
                ] as const
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 py-4 text-sm font-medium transition-colors relative ${
                    activeTab === key
                      ? "text-orange-500"
                      : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-white"
                  }`}
                >
                  {label}
                  {activeTab === key && (
                    <span className="absolute bottom-0 right-0 left-0 h-0.5 bg-orange-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6">
              {activeTab === "specs" && (
                <div className="flex flex-col divide-y divide-gray-50 dark:divide-slate-800">
                  {[
                    ["برند", product.data_layer?.brand],
                    ["دسته‌بندی", product.data_layer?.category],
                    [
                      "امتیاز",
                      `${((product.rating.rate * 5) / 100).toFixed(1)} از ۵`,
                    ],
                    ["تعداد نظرات", `${product.rating.count} نظر`],
                    [
                      "رنگ‌بندی",
                      product.colors?.map((c) => c.title).join("، ") || "—",
                    ],
                    ["گارانتی", "۱۸ ماهه"],
                    ["کد محصول", product.id],
                  ].map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between py-3.5 text-sm"
                    >
                      <span className="text-gray-500 dark:text-slate-400 font-medium">
                        {key}
                      </span>
                      <span className="text-gray-800 dark:text-white font-medium text-left max-w-xs truncate">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col gap-6">
                  {/* Rating Summary */}
                  <div className="flex flex-col md:flex-row gap-6 p-5 bg-gray-50 dark:bg-slate-800/50 rounded-xl border border-gray-100 dark:border-slate-700">
                    <div className="flex flex-col items-center justify-center gap-1 shrink-0">
                      <span className="text-5xl font-black text-gray-900 dark:text-white">
                        {((product.rating.rate * 5) / 100).toFixed(1)}
                      </span>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon key={s} filled={s <= ratingStars} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400 dark:text-slate-500">
                        از ۵ امتیاز
                      </span>
                    </div>
                    <div className="flex-1 flex flex-col gap-2.5 justify-center">
                      <RatingBar label="عالی (۵)" value={68} />
                      <RatingBar label="خوب (۴)" value={20} />
                      <RatingBar label="متوسط (۳)" value={8} />
                      <RatingBar label="بد (۲)" value={3} />
                      <RatingBar label="خیلی بد (۱)" value={1} />
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="flex flex-col gap-4">
                    {MOCK_REVIEWS.map((review) => (
                      <div
                        key={review.id}
                        className="p-5 border border-gray-100 dark:border-slate-800 rounded-xl hover:border-gray-200 dark:hover:border-slate-700 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-sm font-bold shrink-0">
                              {review.author.charAt(0)}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-800 dark:text-white">
                                  {review.author}
                                </span>
                                {review.verified && (
                                  <span className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-md">
                                    خرید تأییدشده
                                  </span>
                                )}
                              </div>
                              <span className="text-xs text-gray-400 dark:text-slate-500">
                                {review.date}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <StarIcon key={s} filled={s <= review.rating} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                          {review.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-slate-400 leading-6">
                          {review.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "shipping" && (
                <div className="flex flex-col gap-4">
                  {[
                    {
                      title: "ارسال سریع",
                      body: "سفارش‌های ثبت‌شده تا ساعت ۱۴، همان روز ارسال می‌شوند. سایر سفارش‌ها حداکثر ظرف ۲۴ ساعت کاری ارسال خواهند شد.",
                    },
                    {
                      title: "گارانتی ۱۸ ماهه",
                      body: "تمامی محصولات دارای گارانتی معتبر ۱۸ ماهه هستند. در صورت هرگونه مشکل فنی، تعویض یا تعمیر رایگان انجام می‌شود.",
                    },
                    {
                      title: "امکان مرجوعی",
                      body: "تا ۷ روز پس از دریافت، در صورت عدم رضایت می‌توانید محصول را مرجوع کنید. هزینه ارسال برگشت بر عهده فروشگاه است.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-slate-800/60 border border-gray-100 dark:border-slate-700"
                    >
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1.5">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-slate-400 leading-6">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* LEFT — Sticky Price Card */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 flex flex-col gap-4">
            {/* Price Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-6 flex flex-col gap-5">
              <div>
                <p className="text-xs text-gray-400 dark:text-slate-500 mb-1">
                  قیمت
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-gray-900 dark:text-white">
                    {PersianNumber(product.price)}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-slate-400">
                    تومان
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    isInCart
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-orange-500 hover:bg-orange-600 active:scale-95 text-white shadow-md shadow-orange-200 dark:shadow-orange-900/30"
                  }`}
                >
                  {isInCart ? "✓ در سبد خرید" : "افزودن به سبد خرید"}
                </button>

                <button className="w-full py-3.5 rounded-xl text-sm font-medium border-2 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:border-orange-300 dark:hover:border-orange-700 hover:text-orange-500 transition-all duration-200">
                  افزودن به علاقه‌مندی‌ها
                </button>
              </div>

              {isInCart && (
                <Link href="/cart">
                  <p className="text-center text-xs text-orange-500 hover:text-orange-600 cursor-pointer underline underline-offset-4">
                    مشاهده سبد خرید
                  </p>
                </Link>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2.5">
              <TrustBadge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                }
                title="ارسال سریع"
                subtitle="تحویل ۲۴ تا ۴۸ ساعته"
              />
              <TrustBadge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                }
                title="گارانتی ۱۸ ماهه"
                subtitle="تعویض یا تعمیر رایگان"
              />
              <TrustBadge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                }
                title="۷ روز ضمانت بازگشت"
                subtitle="بدون سوال مرجوع کنید"
              />
              <TrustBadge
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.8"
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                    />
                  </svg>
                }
                title="پرداخت امن"
                subtitle="درگاه پرداخت معتبر"
              />
            </div>

            {/* Share */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-4">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 mb-3">
                اشتراک‌گذاری
              </p>
              <div className="flex gap-2">
                {[
                  { label: "کپی لینک", icon: "🔗" },
                  { label: "تلگرام", icon: "✈️" },
                  { label: "واتساپ", icon: "💬" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className="flex-1 flex flex-col items-center gap-1 py-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors text-xs text-gray-500 dark:text-slate-400"
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 right-0 left-0 md:hidden bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 p-4 flex items-center gap-4 z-30 shadow-xl">
        <div>
          <p className="text-xs text-gray-400 dark:text-slate-500">قیمت</p>
          <p className="text-base font-black text-gray-900 dark:text-white">
            {PersianNumber(product.price)}{" "}
            <span className="text-xs font-normal text-gray-500">تومان</span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 py-3.5 rounded-xl text-sm font-bold transition-all ${
            isInCart
              ? "bg-emerald-500 text-white"
              : "bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-200"
          }`}
        >
          {isInCart ? "✓ در سبد خرید" : "افزودن به سبد خرید"}
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
