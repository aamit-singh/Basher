import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="flex-center wrapper flex-between flex flex-row gap-4 p-5 text-center">
        <Link href="/" className="w-36">
          <Image
            src="/assets/images/logo.png"
            width={40}
            height={18}
            alt="Basher"
          />
        </Link>
        <p>2024 Basher. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
