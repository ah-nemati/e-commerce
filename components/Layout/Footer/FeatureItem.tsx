import Image from "next/image";

const FeatureItem = ({ icon, title }: { icon: any; title: string }) => {
  return (
    <div className="flex flex-col items-center text-xs text-gray-700 dark:text-white gap-2">
      <span className="md:w-16 w-12 h-12 md:h-16">
        <Image src={icon} alt={title} width={100} height={100} />
      </span>
      <span>{title}</span>
    </div>
  );
};

export default FeatureItem;
