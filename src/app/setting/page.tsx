import React from "react";

type BlockProps = {
  children: React.ReactNode;
};

const Block = ({ children }: BlockProps) => {
  return (
    <div className="bg-slate-200 w-full p-4 text-lg font-bold rounded-xl flex place-content-between items-center">
      {children}
    </div>
  );
};

const BlockButton = ({ children }: BlockProps) => {
  return (
		<button className="bg-slate-800 text-slate-50 px-3 py-1 rounded-lg text-base">
			{children}
		</button>
  );
};

const Setting = () => {
	return (
		<div className="p-2 flex flex-col gap-3">
			<Block>
				데이터 파일 저장
				<BlockButton>저장</BlockButton>
			</Block>
			<Block>
				데이터 파일 불러오기
				<BlockButton>불러오기</BlockButton>
			</Block>
		</div>
	);
}

export default Setting;