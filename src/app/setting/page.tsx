"use client";

import React from "react";
import { appVersion } from "@/lib/version";

const Block = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white shadow-lg shadow-slate-200 w-full p-4 text-lg font-bold rounded-2xl flex justify-between items-center">
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
			className="bg-slate-800 text-white px-3 py-1 rounded-lg text-base duration-100 active:scale-95"
		>
			{children}
		</button>
  );
};

const Setting = () => {
	const handleCopyData = async (name: string) => {
		const text = localStorage.getItem(name) || "";
		try {
      await navigator.clipboard.writeText(text); 
    } catch (err) {
      alert("Failed to copy text");
			console.error(err);
    }
	}

	const handleInputData = (name: string) => {
		const text = prompt("input JSON", "") || "";
		localStorage.setItem(name, text);
	}

	const handleClearData = (name: string) => {
		localStorage.setItem(name, "{}");
	}

	return (
		<div className="p-4 flex flex-col gap-3">
			{/* <Block>
				고정 스케쥴 데이터 복사
				<BlockButton onClick={() => handleCopyData("scheduleData")}>복사</BlockButton>
			</Block>
			<Block>
				하루 스케쥴 데이터 복사
				<BlockButton onClick={() => handleCopyData("subScheduleData")}>복사</BlockButton>
			</Block>
			<Block>
				고정 스케쥴 데이터 입력
				<BlockButton onClick={() => handleInputData("scheduleData")}>입력</BlockButton>
			</Block>
			<Block>
				하루 스케쥴 데이터 입력
				<BlockButton onClick={() => handleInputData("subScheduleData")}>입력</BlockButton>
			</Block> */}
			<Block>
				고정 스케쥴 데이터 삭제
				<BlockButton onClick={() => handleClearData("scheduleData")}>삭제</BlockButton>
			</Block>
			<Block>
				하루 스케쥴 데이터 삭제
				<BlockButton onClick={() => handleClearData("subScheduleData")}>삭제</BlockButton>
			</Block>
			<Block>
				할일 데이터 삭제
				<BlockButton onClick={() => handleClearData("todoData")}>삭제</BlockButton>
			</Block>
			<Block>
				v{appVersion}
				<BlockButton onClick={() => window.open("https://github.com/chamd/letstime", "_blank", "noopener,noreferrer")}>Github</BlockButton>
			</Block>
		</div>
	);
}

export default Setting;