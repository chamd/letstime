"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { GoHome, GoCheckbox, GoCalendar, GoGear } from "react-icons/go";

const navItemStyle = "w-7 text-2xl flex place-content-center items-center duration-200";
const navDefaultStyle = "text-slate-400";
const navSelectedStyle = "text-blue-500 border-b-3 border-blue-500 mb-1";

const navItems = [GoHome, GoCheckbox, GoCalendar, GoGear];
const urls = ["/", "/todo", "/schedule", "/setting"];

const Nav = () => {
  const pathname = usePathname();
  const [selectedNav, setSelectedNav] = useState(0);

  useEffect(() => {
    const index = urls.findIndex((url) => url === pathname);
    if (index !== -1) setSelectedNav(index);
  }, [pathname]);

  return (
    <nav className="
      w-60 h-14 fixed 
      mx-auto left-0 right-0 bottom-4
      rounded-full shadow-xl
      border border-slate-400/30
      bg-white/60 z-2
      backdrop-blur-md
    ">
      <ul className="flex flex-row place-content-evenly h-full">
        {navItems.map((Item, index) => (
          <li
            key={index}
            className={`${navItemStyle} ${
              selectedNav === index ? navSelectedStyle : navDefaultStyle
            }`}
          >
            <Link href={urls[index]} replace>
              <Item />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
