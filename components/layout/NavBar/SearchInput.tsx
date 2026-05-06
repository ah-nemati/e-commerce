const SearchInput = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (v: string) => void;
}) => {
  return (
    <div className="flex items-center dark:text-white dark:bg-slate-800 bg-dark w-5/12 rounded-md px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-gray-400 dark:stroke-white h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="outline-none h-12 px-2 bg-dark dark:placeholder-white dark:text-white dark:bg-slate-800 w-full"
        placeholder="جستجو در بازار"
      />
    </div>
  );
};

export default SearchInput;
