import { Color, ProductType } from "@/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Notify } from "../../Store/Actions";

const BRANDS = [
  "سامسونگ",
  "ایسوس",
  "اپل",
  "شیائومی",
  "لنوو",
  "میشن",
  "مافی",
  "لیتو",
  "تیولف",
  "متفرقه",
];
const CATEGORIES = [
  "قطعات کامپیوتر",
  "گوشی موبایل",
  "لپ تاپ و الترابوک",
  "هدفون و هندزفری",
];

type FormState = {
  title: string;
  price: string;
  brand: string;
  category: string;
};

type FormErrors = Partial<Record<keyof FormState | "image" | "colors", string>>;

const inputClass =
  "w-full border border-gray-200 dark:border-slate-600 bg-transparent p-3 rounded-lg outline-none focus:border-orange-400 dark:focus:border-orange-400 text-gray-800 dark:text-white transition-colors text-sm placeholder:text-gray-400 dark:placeholder:text-slate-500";

const labelClass =
  "text-sm font-medium text-gray-600 dark:text-slate-300 mb-1.5 block";

const FieldError = ({ msg }: { msg?: string }) =>
  msg ? <p className="text-red-500 text-xs mt-1">{msg}</p> : null;

interface EditProductProps {
  productId: string;
  onBack: () => void;
}

const EditProduct: React.FC<EditProductProps> = ({ productId, onBack }) => {
  const dispatch = useDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorHexRef = useRef<string>("#3b82f6");

  const [form, setForm] = useState<FormState>({
    title: "",
    price: "",
    brand: BRANDS[0],
    category: CATEGORIES[0],
  });
  const [colors, setColors] = useState<Color[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [colorHex, setColorHex] = useState("#3b82f6");
  const [colorTitle, setColorTitle] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  // Image state — currentUrl = existing saved URL, imageFile = new file chosen
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploadedUrl, setUploadedUrl] = useState<string>("");

  // ─── Load product ───
  useEffect(() => {
    if (!productId) return;
    axios
      .get<{ success: boolean; product: ProductType }>("/api/productDetail", {
        params: { id: productId },
      })
      .then((res) => {
        const p = res.data.product;
        if (!p) return;
        const existingUrl = p.image?.url?.[0] ?? "";
        setForm({
          title: p.title_fa ?? "",
          price: String(p.price ?? ""),
          brand: p.data_layer?.brand ?? BRANDS[0],
          category: p.data_layer?.category ?? CATEGORIES[0],
        });
        setCurrentUrl(existingUrl);
        setColors(p.colors ?? []);
      })
      .catch(() => dispatch(Notify("error", "خطا در دریافت محصول")))
      .finally(() => setLoading(false));
  }, [productId, dispatch]);

  const handleChange = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  // ─── Image selection ───
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((p) => ({ ...p, image: "فقط فایل تصویر قابل قبول است" }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((p) => ({
        ...p,
        image: "حجم فایل نباید بیشتر از ۵ مگابایت باشد",
      }));
      return;
    }
    setImageFile(file);
    setUploadedUrl("");
    setErrors((p) => ({ ...p, image: undefined }));
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      const res = await axios.post<{ success: boolean; url: string }>(
        "/api/uploadImage",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      setUploadedUrl(res.data.url);
      return res.data.url;
    } catch {
      setErrors((p) => ({ ...p, image: "خطا در آپلود تصویر" }));
      return null;
    } finally {
      setUploading(false);
    }
  };

  // ─── Validation ───
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (form.title.length < 10)
      newErrors.title = "نام محصول باید حداقل ۱۰ کاراکتر باشد";
    if (!form.price || Number(form.price) <= 0)
      newErrors.price = "قیمت معتبر وارد کنید";
    // Image is valid if either an existing URL exists OR a new file is selected
    if (!currentUrl && !imageFile) newErrors.image = "انتخاب تصویر الزامی است";
    if (!colors.length) newErrors.colors = "حداقل یک رنگ وجود داشته باشد";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Color ───
  const addColor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!colorTitle.trim()) {
      setErrors((p) => ({ ...p, colors: "نام رنگ را وارد کنید" }));
      return;
    }
    if (colors.some((c) => c.hex_code === colorHex || c.title === colorTitle)) {
      setErrors((p) => ({ ...p, colors: "رنگ تکراری است" }));
      return;
    }
    setColors((prev) => [
      ...prev,
      { id: Date.now().toString(), hex_code: colorHex, title: colorTitle },
    ]);
    setColorTitle("");
    setErrors((p) => ({ ...p, colors: undefined }));
  };

  const removeColor = (colorId: string) =>
    setColors((prev) => prev.filter((c) => c.id !== colorId));

  // ─── Submit ───
  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);

    try {
      // If new file selected, upload it; otherwise keep existing URL
      let imageUrl = currentUrl;
      if (imageFile) {
        const uploaded = uploadedUrl || (await uploadImage());
        if (!uploaded) {
          setSubmitting(false);
          return;
        }
        imageUrl = uploaded;
      }

      const product: Partial<ProductType> = {
        id: productId,
        title_fa: form.title,
        image: { url: [imageUrl] },
        price: Number(form.price),
        data_layer: { brand: form.brand, category: form.category },
        colors,
      };
      await axios.post("/api/editProduct/", { product });
      dispatch(Notify("success", "تغییرات روی محصول اعمال شد"));
      onBack();
    } catch {
      dispatch(Notify("error", "خطا در ذخیره تغییرات"));
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-64 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // The preview to show: new file preview takes priority over existing URL
  const displayPreview = imagePreview || currentUrl;

  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700 w-full">
      {/* Header */}
      <div className="flex items-center gap-3 p-6 border-b border-gray-100 dark:border-slate-700">
        <button
          onClick={onBack}
          className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">
          ویرایش محصول
        </h2>
      </div>

      <div className="p-6 flex flex-col gap-5">
        {/* Title */}
        <div>
          <label className={labelClass}>نام محصول</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
            className={inputClass}
            placeholder="نام محصول را وارد کنید"
            autoFocus
          />
          <FieldError msg={errors.title} />
        </div>

        {/* Image Upload */}
        <div>
          <label className={labelClass}>تصویر محصول</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl cursor-pointer transition-colors p-4
              ${
                displayPreview
                  ? "border-orange-300 dark:border-orange-700"
                  : "border-gray-200 dark:border-slate-600 hover:border-orange-300 dark:hover:border-orange-700"
              } bg-gray-50 dark:bg-slate-700/30`}
          >
            {displayPreview ? (
              <div className="flex items-center gap-4 w-full">
                <img
                  src={displayPreview}
                  alt="preview"
                  className="w-20 h-20 rounded-lg object-cover shrink-0 border border-gray-200 dark:border-slate-600"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  {imageFile ? (
                    <>
                      <p className="text-sm font-medium text-gray-700 dark:text-slate-200 truncate">
                        {imageFile.name}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-slate-500">
                        {(imageFile.size / 1024).toFixed(0)} KB — تصویر جدید
                      </p>
                    </>
                  ) : (
                    <p className="text-sm font-medium text-gray-700 dark:text-slate-200 truncate">
                      تصویر فعلی
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageFile(null);
                      setImagePreview("");
                      setUploadedUrl("");
                      setCurrentUrl("");
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="text-xs text-red-400 hover:text-red-500 text-right transition-colors"
                  >
                    تغییر تصویر
                  </button>
                </div>
              </div>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-gray-300 dark:text-slate-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div className="text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-slate-300">
                    برای آپلود کلیک کنید
                  </p>
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">
                    PNG, JPG, WEBP — حداکثر ۵ مگابایت
                  </p>
                </div>
              </>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <FieldError msg={errors.image} />
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>برند</label>
            <select
              value={form.brand}
              onChange={(e) => handleChange("brand", e.target.value)}
              className={inputClass}
            >
              {BRANDS.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>دسته‌بندی</label>
            <select
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className={inputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price */}
        <div>
          <label className={labelClass}>قیمت (تومان)</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            className={`${inputClass} w-1/2`}
            placeholder="۰"
          />
          <FieldError msg={errors.price} />
        </div>

        {/* Colors */}
        <div>
          <label className={labelClass}>مدیریت رنگ‌ها</label>
          <form onSubmit={addColor} className="flex items-center gap-2">
            <input
              type="color"
              value={colorHex}
              onChange={(e) => setColorHex(e.target.value)}
              className="w-10 h-10 rounded cursor-pointer border border-gray-200 dark:border-slate-600 p-0.5 shrink-0"
            />
            <input
              type="text"
              value={colorTitle}
              onChange={(e) => setColorTitle(e.target.value)}
              placeholder="نام رنگ"
              className={`${inputClass} flex-1`}
            />
            <button
              type="submit"
              className="px-4 h-10 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors shrink-0"
            >
              افزودن
            </button>
          </form>
          <FieldError msg={errors.colors} />
          <div className="flex flex-wrap gap-2 mt-3">
            {colors.length > 0 ? (
              colors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-2 border border-gray-200 dark:border-slate-600 rounded-lg px-3 py-1.5 text-sm text-gray-700 dark:text-slate-300"
                >
                  <span
                    className="w-4 h-4 rounded-full border border-gray-200 dark:border-slate-500 shrink-0"
                    style={{ background: c.hex_code }}
                  />
                  <span>{c.title}</span>
                  <button
                    type="button"
                    onClick={() => removeColor(c.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors mr-1 text-base leading-none"
                  >
                    ×
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 dark:text-slate-500">
                رنگی اضافه نشده است.
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2 border-t border-gray-100 dark:border-slate-700">
          <button
            onClick={handleSubmit}
            disabled={submitting || uploading}
            className="flex-1 sm:flex-none bg-orange-500 hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed text-white px-8 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {(submitting || uploading) && (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {uploading
              ? "در حال آپلود..."
              : submitting
                ? "در حال ذخیره..."
                : "ذخیره تغییرات"}
          </button>
          <button
            onClick={onBack}
            className="flex-1 sm:flex-none border border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-slate-300 px-8 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
