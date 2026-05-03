import { Color } from "@/types";
import { useState, FC } from "react";

interface Props {
  colors: Color[];
}

export const ColorProducts: FC<Props> = ({ colors }) => {
  const [active, setactive] = useState<string | number>(colors[0].id);

  const activeColor = colors.find((color) => color.id === active);

  return (
    <div className="flex flex-col mt-8">
      <span className="md:text-base text-sm">
        رنگ : {activeColor ? activeColor.title : ""}
      </span>
      <div className="flex gap-2 mt-4">
        {colors.map((color: Color) => (
          <div
            className="flex md:w-11 w-9 h-9 md:h-11 rounded-full cursor-pointer border items-center justify-center"
            key={color.id}
            style={{
              backgroundColor:
                active === color.id ? "rgb(33, 150, 243)" : "white",
            }}
            onClick={() => setactive(color.id)}
          >
            <span
              style={{
                backgroundColor: color.hex_code,
                color:
                  active === color.id
                    ? color.hex_code === "#FFFFFF"
                      ? "black"
                      : "white"
                    : color.hex_code,
              }}
              className="flex md:w-8 w-6 h-6 md:h-8 border-2 rounded-3xl items-center justify-center"
            >
              {/* Conditionally render the checkmark only for the active color to improve performance. */}
              {active === color.id && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="md:h-5 md:w-5 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
