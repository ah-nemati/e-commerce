import { memo, useState, FC, ChangeEvent, MouseEvent, ReactNode } from "react";
import EyeOffIcon from "./EyeOffIcon";
import EyeIcon from "./EyeIcon";

interface InputProps {
  data: string;
  jsx?: ReactNode;
  aLink?: ReactNode;
  label?: string;
  value: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  data,
  aLink,
  label,
  value,
  type = "text",
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";

  const handleShowPassword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isPasswordField) {
      setShowPassword((prev) => !prev);
    }
  };

  return (
    <label
      htmlFor={data}
      className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white"
    >
      {/* LABEL */}
      <div className="flex items-center justify-between">
        <span>{label || data}</span>
        {aLink}
      </div>

      {/* INPUT WRAPPER */}
      <div
        className="
          flex items-center rounded-xl border border-gray-200
          bg-gray-50 px-3 py-3 transition-all duration-200
          hover:border-blue-400 focus-within:border-blue-500
          focus-within:ring-2 focus-within:ring-blue-100
          dark:border-slate-700 dark:bg-slate-800
        "
      >
        <input
          id={data}
          value={value}
          onChange={onChange}
          required
          type={isPasswordField ? (showPassword ? "text" : "password") : type}
          className="
            w-full flex-1 border-none bg-transparent text-sm
            outline-none placeholder:text-gray-400
            dark:text-white dark:placeholder:text-gray-500
            
            /* -- ترفند تاخیر ترانزیشن برای حل مشکل Autofill -- */
            [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]
            [&:-webkit-autofill]:[-webkit-text-fill-color:#4b5563]
            dark:[&:-webkit-autofill]:[-webkit-text-fill-color:#fff]
          "
        />

        {/* PASSWORD TOGGLE */}
        {isPasswordField && (
          <button
            type="button"
            onClick={handleShowPassword}
            className="mr-2 cursor-pointer text-slate-500 transition hover:text-blue-500 focus:outline-none"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>
    </label>
  );
};

export default memo(Input);
