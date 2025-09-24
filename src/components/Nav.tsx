"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { GoHome, GoCheckbox, GoCalendar, GoGear } from "react-icons/go";

const navItemStyle = "w-10 text-3xl flex place-content-center items-center duration-200";
const navDefaultStyle = "text-slate-400";
const navSelectedStyle = "text-blue-500 border-b-3 border-blue-500 mb-1";

const navItems = [GoHome, GoCheckbox, GoCalendar, GoGear];
const urls = ["/", "/todo", "/schedule", "/setting"];

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedNav, setSelectedNav] = useState(0);

  useEffect(() => {
    const index = urls.findIndex((url) => url === pathname);
    if (index !== -1) setSelectedNav(index);
  }, [pathname]);

  const handleNav = (num: number, url: string) => {
    setSelectedNav(num);
    router.replace(url);
  };

  return (
    <nav className="w-full h-16 fixed bottom-0 bg-slate-100 z-2">
      <ul className="flex flex-row place-content-evenly h-full">
        {navItems.map((Item, index) => (
          <li
            key={index}
            className={`${navItemStyle} ${
              selectedNav === index ? navSelectedStyle : navDefaultStyle
            }`}
            onClick={() => handleNav(index, urls[index])}
          >
            <Item />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
