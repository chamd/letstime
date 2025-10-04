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
    <header className="
      w-full h-15 fixed top-0 
      text-2xl font-semibold
      flex items-center justify-center 
      border border-slate-400/30
      bg-white/60 z-2
      backdrop-blur-md
    ">
      {title[pathname as keyof typeof title] || "홈"}
    </header>
  );
};

export default Header;
