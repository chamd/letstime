"use client";

import { useState, useEffect, useMemo } from "react";
import ScheduleUtil, { ScheduleState } from "@/utils/Schedule";

const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const timeZone = 'Asia/Seoul';

const Home = () => {
	const [schedule, setSchedule] = useState<ScheduleState>({});
	const [now, setNow] = useState(new Date());
	
  useEffect(() => {
    const scheduleData = localStorage.getItem("scheduleData");
    const scheduleObject = JSON.parse(scheduleData || "{}");
    setSchedule(scheduleObject);

    const interval = setInterval(() => {
      setNow(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

	const kst = useMemo(() => {
    const d = new Date(now.toLocaleString('en-US', { timeZone }));
    return {
      today: d.getDay(),
      todate: d.getDate(),
      tohour: d.getHours(),
    };
  }, [now]);

	return (
		<>
			<div className="w-full max-w-91 mx-auto py-2">

				<div 
					className="
						bg-slate-700 rounded-full w-30 h-10 
						text-slate-50 font-bold text-center leading-10
						mx-auto bottom-18 left-0 right-0 fixed z-2
				">
					{dayNames[kst.today]}({kst.todate})
				</div>

				<div className="flex flex-row gap-1 pb-12">
					<div className="flex flex-col gap-1">
						{Array.from({ length: 17 }, (_, i) => i + 7).map((time) => (
							<div 
								key={time} 
								className={`
									rounded-lg w-6 h-16 text-center font-bold duration-200
									${kst.tohour == time ? "bg-blue-500 text-slate-50 outline-blue-500 outline-4 rounded-r-none" : "bg-slate-300 text-slate-950"}
								`}
							>
									{time}
							</div>
						))}
					</div>
					<div className="flex flex-col gap-1 w-full">
						{Array.from({ length: 17 }, (_, i) => i + 7).map((time) => {
							const item = schedule[kst.today]?.[time];

							const isCovered = Object.entries(schedule[kst.today] || {}).some(
								([start, v]) => {
									const s = Number(start);
									return v.long > 1 && time > s && time < s + v.long;
								}
							);

							if (isCovered) {
								return <div key={`${kst.today}-${time}`} className="hidden" />;
							}

							const l = item?.long || 1;
							const rowHeight = 4;
							const gapHeight = 0.25;
							const height = rowHeight * l + gapHeight * (l - 1);

							return (
								<div
									key={`${kst.today}-${time}`}
									className={`
										text-slate-50 text-xs rounded-lg w-full p-0.5 overflow-hidden break-words duration-200
										${kst.tohour == time ? "outline-blue-500 outline-4 rounded-l-none" : ""}
										${ScheduleUtil.getColorById(
											schedule[kst.today]?.[time]?.colorId
										)}
									`}
									style={{ height: `${height}rem` }}
								>
									{schedule[kst.today]?.[time]?.title || ""}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
