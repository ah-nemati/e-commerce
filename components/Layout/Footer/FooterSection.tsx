const FooterSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg mb-4">{title}</h3>
      <ul className="text-gray-500 dark:text-white">
        {items.map((item) => (
          <li key={item} className="py-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
