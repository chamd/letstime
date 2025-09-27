"use client";

import { usePathname } from "next/navigation";

const title = {
  "/todo": "할일",
  "/schedule": "고정 시간표",
  "/setting": "설정"
}

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 fixed top-0 bg-slate-100 text-2xl font-bold flex items-center place-content-center z-2">
      {title[pathname as keyof typeof title] || "Time"}
    </header>
  );
};

export default Header;
