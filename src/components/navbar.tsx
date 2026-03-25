import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-center w-full px-6 py-4 bg-[#1c2331]">
      <Link href="https://cyberdefenders.org/" target="_blank">
        <Image
          src="https://cyberdefenders.org/static/assets/images/brand/logo/cyberdefenders_secondary_blue_logo_no_motto_2.svg"
          alt="CyberDefenders Logo"
          className="h-8 w-auto object-contain brightness-0 invert"
          height={200}
          width={200}
        />
      </Link>
    </nav>
  );
}
