"use client";

import React from "react";

const Block = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-slate-200 w-full p-4 text-lg font-bold rounded-2xl flex place-content-between items-center">
      {children}
    </div>
  );
};

const BlockButton = ({ onClick, children }: {
	onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
		<button 
			onClick={onClick}
			className="bg-slate-800 text-slate-50 px-3 py-1 rounded-lg text-base duration-100 active:scale-95"
		>
			{children}
		</button>
  );
};

const Setting = () => {
	const handleClearData = () => {
		localStorage.setItem("scheduleData", "{}");
	}

	return (
		<div className="p-4 flex flex-col gap-3">
			<Block>
				일정 데이터 삭제
				<BlockButton onClick={handleClearData}>삭제</BlockButton>
			</Block>
		</div>
	);
}

export default Setting;