import { FC } from "react";

interface NavItemProps {
  d1: string;
  d2?: string;
  value: string;
  onClick?: () => void;
}

const NavItem:FC<NavItemProps> = ({ d1, d2, value, onClick }) => {
  return (
    <div className="flex p-3 hover:text-orange-500">
        <div
          onClick={onClick}
          className="cursor-pointer flex items-center gap-2 w-11/12"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d={d1} />
            <path strokeLinecap="round" strokeLinejoin="round" d={d2} />
          </svg>
          <span>{value}</span>
        </div>
        <div className="w-1/12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
    </div>
  );
};

export default NavItem;
