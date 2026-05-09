import { FC } from "react";

interface Props {
  d1: string;
  d2?: string;
  label: string;
  onClick?: () => void;
  active?: boolean;
  danger?: boolean;
}

const NavItem: FC<Props> = ({ d1, d2, label, onClick, active, danger }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all",
        "group ${
          active
            ? "bg-orange-50 text-orange-500 dark:bg-slate-600"
            : "hover:bg-gray-100 dark:hover:bg-slate-600"
        } ${danger && "hover:text-red-500"}`}
    >
      <div className="flex items-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={d1} />
          {d2 && <path strokeLinecap="round" strokeLinejoin="round" d={d2} />}
        </svg>

        <span className="text-sm font-medium">{label}</span>
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-4 h-4 opacity-50 group-hover:opacity-100 transition"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </div>
  );
};

export default NavItem;
