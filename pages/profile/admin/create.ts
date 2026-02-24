import axios from "axios";
import ProfileNav from "../../../components/Tools/ProfileNav";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Notify } from "../../../Store/Actions";
import { useRouter } from "next/router";

const Create = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();

  const colorhxcodeRef = useRef();
  const colortitleRef = useRef();
  const titleRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();

  const [color, setColor] = useState([]);
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();

  const [isColor, setIsColor] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isTitle, setIsTitle] = useState(false);
  const [isPrice, setIsPrice] = useState(false);

  const [focusColorCode, setFocusColorCode] = useState(false);
  const [focusColorTitle, setfocusColorTitle] = useState(false);
  const [colorMessage, setColorMessage] = useState("");
  const [focusPrice, setFocusPrice] = useState(false);
  const [errorPriceInput, setErrorPriceInput] = useState("");
  const [errorLinkImage, setErrorLinkImage] = useState("");
  const [focusImageLink, setFocusImageLink] = useState(false);
  const [errorTitle, seterrorTitle] = useState("");
  const [focusTitle, setFocusTitle] = useState(false);

  
  useEffect(() => {
    titleRef?.current?.focus();
  }, []);

  useEffect(() => {
    const urlRegx = new RegExp(
      "(https://www.|http://www.|https://|http://)?[a-zA-Z0-9]{2,}(.[a-zA-Z0-9]{2,})(.[a-zA-Z0-9]{2,})?/[a-zA-Z0-9]{2,}"
    );
    if (link.length > 0) {
      if (urlRegx.test(link)) {
        if (
          link.includes(
            "https://dkstatics-public.digikala.com/digikala-products/"
          )
        ) {
          axios
            .get(link)
            .then(() => {
              setIsLink(true);
              setErrorLinkImage();
            })
            .catch(() => setErrorLinkImage("لینک عکس اشتباه است"));
        }
      } else {
        setErrorLinkImage("فرمت صحیح لینک را وارد کنید");
        setIsLink(false);
      }
    }
  }, [link]);

  useEffect(() => {
    const priceRegx = new RegExp("^[0-9]");
    if (!priceRegx.test(price) && price > 0) {
      setErrorPriceInput("از فرمت عددی استفاده کنید");
    } else {
      setErrorPriceInput();
      setIsPrice(price > 0 ? true : false);
    }
  }, [price]);

  useEffect(() => {
    if (title.length >= 10) {
      setIsTitle(true);
      seterrorTitle();
    } else {
      seterrorTitle("نام محصول باید حداقل 10 کاراکتر باشد");
      setIsTitle(false);
    }
  }, [title]);

  useEffect(() => {
    setIsColor(color.length > 0 ? true : false);
  }, [color]);

  const save = () => {
    const brand = brandRef?.current?.value;
    const category = categoryRef?.current?.value;
    if (brand && category && isColor && isPrice && isTitle && isLink) {
      setColorMessage();
      setErrorPriceInput();
      setErrorLinkImage();
      axios
        .post("/api/createProduct", {
          color,
          link,
          title,
          brand,
          category,
          price,
        })
        .then(() => {
          dispatch(Notify("success", "محصول جدید اضافه شد"));
          push("/");
        });
    } else if (!isColor) {
      setColorMessage("حداقل یک رنگ اضافه کنید");
    } else if (!isPrice) {
      setErrorPriceInput("قیمت محصول را وارد کنید");
    } else if (!isLink) {
      setErrorLinkImage("لینک عکس محصول را وارد کنید");
    }
  };

  const saveColor = (e) => {
    e.preventDefault();
    const hex_code = colorhxcodeRef.current?.value;
    const title = colortitleRef.current?.value;
    if (title && hex_code) {
      if (color.length > 0) {
        let found = false;
        for (let index = 0; index < color.length; index++) {
          if (
            color[index].hex_code == hex_code ||
            color[index].title == title
          ) {
            found = true;
          }
        }
        if (!found) {
          setColor([
            ...color,
            {
              id: !color.length ? 1 : color.length + 1,
              hex_code,
              title,
            },
          ]);
          setColorMessage();
        } else {
          setColorMessage("رنگ قبلا اضافه شده است");
        }
      } else {
        setColor([
          ...color,
          {
            id: !color.length ? 1 : color.length + 1,
            hex_code,
            title,
          },
        ]);
        setColorMessage();
      }
    } else {
      setColorMessage("فیلد ها را کامل کنید");
    }
  };

  return (
    <div className="sm:flex-row flex-col md:mx-52 m-0 my-10 sm:justify-around sm:p-0 p-3 sm:gap-0 gap-2">
      <ProfileNav />
      <div className="flex-col dark:text-white text-gray-600 rounded bg-white dark:bg-slate-600 sm:w-8/12 gap-8 p-8">
        {/* title */}
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="border rounded p-2 w-10/12"
            placeholder="نام محصول را وارد کنید"
            required
            onFocus={() => setFocusTitle(true)}
            onBlur={() => setFocusTitle(false)}
            value={title}
            ref={titleRef}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span
            className={`${
              errorTitle && !focusTitle ? "visible" : "hidden"
            } text-red-500`}
          >
            {errorTitle}
          </span>
        </div>
        {/* link image */}
        <div className="flex flex-col gap-2">
          <input
            type="url"
            className="border rounded p-2 w-10/12"
            placeholder="لینک عکس را با این فرمت وارد کنید :  .../https://dkstatics-public.digikala.com/digikala-products "
            required
            value={link}
            onFocus={() => setFocusImageLink(true)}
            onBlur={() => setFocusImageLink(false)}
            onChange={(e) => setLink(e.target.value)}
          />
          <span
            className={`${
              errorLinkImage && !focusImageLink ? "visible" : "hidden"
            } text-red-500`}
          >
            {errorLinkImage}
          </span>
        </div>
        {/* brand and category */}
        <div className="flex flex-row gap-6">
          <div className="flex flex-col w-1/2">
            <label htmlFor="brand">برند</label>
            <select
              name=""
              id="brand"
              className="rounded p-2 dark:bg-slate-900"
              required
              ref={brandRef}
            >
              <option value="سامسونگ">سامسونگ</option>
              <option value="ایسوس">ایسوس</option>
              <option value="اپل">اپل</option>
              <option value="شیائومی">شیائومی</option>
              <option value="لنوو">لنوو</option>
              <option value="میشن">میشن</option>
              <option value="مافی">مافی</option>
              <option value="لیتو">لیتو</option>
              <option value="تیولف">تیولف</option>
              <option value="متفرقه">متفرقه</option>
            </select>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="category">دسته بندی</label>
            <select
              name=""
              id="category"
              className="rounded p-2 dark:bg-slate-900"
              required
              ref={categoryRef}
            >
              <option value="قطعات کامپیوتر">قطعات کامپیوتر</option>
              <option value="گوشی موبایل">گوشی موبایل</option>
              <option value="لپ تاپ و الترابوک">لپ تاپ و الترابوک</option>
              <option value="هدفون و هندزفری">هدفون و هندزفری</option>
            </select>
          </div>
        </div>
        {/* price input */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <input
              type="number"
              className="p-2 w-1/2 border rounded"
              placeholder="قیمت کالا را به ریال وارد کنید"
              required
              value={price}
              onFocus={() => setFocusPrice(true)}
              onBlur={() => setFocusPrice(false)}
              onChange={(e) => setPrice(e.target.value)}
            />
            <span
              className={`${
                errorPriceInput && !focusPrice ? "visible" : "hidden"
              } text-red-500`}
            >
              {errorPriceInput}
            </span>
          </div>
          {/* color input */}
          <form className="flex flex-col w-full gap-4" onSubmit={saveColor}>
            <div className="flex flex-row w-7/12 items-center border rounded p-1 dark:bg-slate-900">
              <input
                type="color"
                name="hex_code"
                className="w-1/12 ml-5"
                onFocus={() => setFocusColorCode(true)}
                onBlur={() => setFocusColorCode(false)}
                ref={colorhxcodeRef}
                required
              />
              <input
                type="text"
                name="title"
                className="outline-none w-8/12 dark:bg-slate-900"
                onFocus={() => setfocusColorTitle(true)}
                onBlur={() => setfocusColorTitle(false)}
                ref={colortitleRef}
                placeholder="نام رنگ"
              />
              <button
                type="submit"
                className="py-2 w-3/12 bg-green-500 rounded text-white"
              >
                ذخیره رنگ
              </button>
            </div>
            <span
              className={`${
                colorMessage && !focusColorCode && !focusColorTitle
                  ? "visible"
                  : "hidden"
              } text-red-500`}
            >
              {colorMessage}
            </span>
          </form>
        </div>
        {/* show colors */}
        <div className="flex flex-row items-center gap-4">
          <label htmlFor="colors">رنگ های موجود : </label>
          <div id="colors" className="flex flex-row gap-2 text-gray-400">
            {color.length > 0
              ? color.map((el) => (
                  <div
                    className="flex flex-col border p-1 rounded min-w-[100px] gap-2"
                    key={el.id}
                  >
                    <div className="flex flex-row justify-end">
                      <button
                        onClick={() =>
                          setColor(color.filter((item) => item.id !== el.id))
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-red-600"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                    <span
                      className="w-1/2 h-6 block rounded border"
                      style={{ backgroundColor: el.hex_code }}
                    ></span>
                    <span>{el.title}</span>
                  </div>
                ))
              : "لیست خالی می باشد."}
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4 text-white">
          <button
            className="py-2 px-8 rounded-md bg-green-400"
            onClick={save}
          >
            ایجاد محصول
          </button>
          <button
            className="py-2 px-8 rounded-md bg-red-400"
            onClick={() => push("/profile/admin")}
          >
            انصراف
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
