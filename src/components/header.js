import Link from "./link";
import { Logo } from "./logo";
import { useRouter } from "next/router";
import { Phone, Marker } from "@/components/icons";
import React from "react";

const destinations = [
  { label: "Haupt", link: "/#landing" },
  { label: "Räume", link: "/#spaces" },
  { label: "Über", link: "/#about" },
  { label: "Kontakt", link: "/#contact" },
];

function navigateFullpage(e, path) {
  e.preventDefault();
  window.window.fullpage_api.moveTo(path, 0);
}

const Header = React.forwardRef(({ className, dark = true }, ref) => {
  const router = useRouter();
  return (
    <div
      ref={ref}
      className={`${className} bg-opacity-20 fixed top-0 left-0 right-0 text-gray-500`}
    >
      <header className="container flex justify-between items-center py-7 ">
        <Link
          onClick={(e) => navigateFullpage(e, "landing")}
          className={dark ? "text-white" : "text-black"}
        >
          <Logo />
        </Link>
        <div className="flex space-x-24 items-center">
          <ul className="flex space-x-12">
            {destinations.map((it) => (
              <li key={it.link}>
                <h6>
                  <Link
                    href={it.link}
                    className={
                      router.asPath == it.link
                        ? dark
                          ? "text-white"
                          : "text-primary"
                        : `text-current ${
                            dark ? "hover:text-white" : "hover:text-primary"
                          }`
                    }
                    onClick={(e) => navigateFullpage(e, it.link.substr(2))}
                  >
                    {it.label}
                  </Link>
                </h6>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-8 text-gray-300">
            <Link href="#" onClick={(e) => navigateFullpage(e, "contact")}>
              <Phone
                dark={dark}
                className={`rounded-full border border-current ${
                  dark
                    ? "hover:border-white"
                    : "hover:border-opacity-60 hover:border-primary"
                }`}
              />
            </Link>
            <span className="h-14 w-px bg-current" />
            <Link href="#" onClick={(e) => navigateFullpage(e, "map")}>
              <Marker
                dark={dark}
                className={`rounded-full border border-current ${
                  dark
                    ? "hover:border-white"
                    : "hover:border-opacity-60 hover:border-primary"
                }`}
              />
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
});

Header.displayName = "Header";

export default Header;
