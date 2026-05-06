import aparat from "./../../../images/aparat.png";
import linkedin from "./../../../images/linkedin.png";
import instagram from "./../../../images/instagram.png";
import twitter from "./../../../images/twitter.png";
import Image from "next/image";

const socials = [
  { icon: aparat, alt: "aparat" },
  { icon: linkedin, alt: "linkedin" },
  { icon: instagram, alt: "instagram" },
  { icon: twitter, alt: "twitter" },
];

const FooterSocial = () => {
  return (
    <div className="flex flex-col justify-between">
      <h3 className="md:py-0 py-4">همراه ما باشید !</h3>

      <div className="flex justify-between pl-12">
        {socials.map((s) => (
          <button key={s.alt} className="w-10 h-10">
            <Image src={s.icon} alt={s.alt} width={100} height={100} />
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h4 className="mt-6">
          با ثبت ایمیل ، از جدیدترین تخفیف ها خبردار شوید
        </h4>

        <div className="flex gap-2">
          <input
            type="email"
            className="outline-none p-3 w-3/4 rounded-md bg-gray-100 dark:bg-slate-800 text-sm"
            placeholder="ایمیل شما"
          />
          <button className="bg-orange-400 rounded-md p-4 w-1/4 text-sm text-white">
            ثبت
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterSocial;
