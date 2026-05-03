import { memo, useState, FC, ChangeEvent, MouseEvent, ReactNode } from "react";

interface InputProps {
    data: string;
    jsx: ReactNode;
    aLink?: ReactNode;
    label?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({ data, jsx, aLink, label, value, onChange }) => {
  const [IshowPasword, setIshowPasword] = useState(false);
  const handleShowPasword = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (data === "password") {
      setIshowPasword(!IshowPasword);
    }
  };

  return (
    <>
      <label
        htmlFor={data}
        className="flex flex-col text-gray-600 dark:text-white text-sm gap-2"
      >
        <div className="flex justify-between">
          {label ? label : data} {aLink}
        </div>
        <div
          className="bg-dark dark:bg-slate-800 dark:border-none border flex flex-row p-2 text-base rounded-md 
          hover:border-blue-500"
        >
          <input
            className="flex-1 outline-none dark:bg-slate-800 dark:text-white bg-gray-100 border-0"
            type={data === "password" ? (IshowPasword ? "text" : "password") : data}
            id={data}
            value={value}
            onChange={onChange}
            required
          />
          <button onClick={handleShowPasword}>
            {!IshowPasword ? (
              jsx
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </label>
    </>
  );
};

export default memo(Input);
