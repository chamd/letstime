"use client";
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { useState, useEffect, useMemo } from "react";
import ScheduleUtil, { ScheduleState, SubScheduleItem, SubScheduleState } from "@/utils/Schedule";

const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const timeZone = 'Asia/Seoul';

const Home = () => {
	const [schedule, setSchedule] = useState<ScheduleState>({});
	const [subSchedule, setSubSchedule] = useState<SubScheduleState>({
		yesterday: {},
		today: {},
		tomorrow: {}
	});
	const [now, setNow] = useState(new Date());
	
  useEffect(() => {
    const scheduleData = localStorage.getItem("scheduleData");
    const scheduleObject = JSON.parse(scheduleData || "{}");
    setSchedule(scheduleObject);

    const subScheduleData = localStorage.getItem("subScheduleData");
    const subScheduleObject = JSON.parse(subScheduleData || "{}");
    setSubSchedule(subScheduleObject);
		
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

	const handleSetSubSchedule = (time: number) => {
		const title = prompt("title?", "") || "세부 일정";
		const colorIdStr = prompt("colorId", "") || 0;
		const colorId = Number(colorIdStr);

		setSubSchedule((prev) => {
				const prevState = prev ?? { yesterday: {}, today: {}, tomorrow: {} };
				const newToday = { ...(prevState.today || {}) };
				const newTimeArray = [...(newToday[time] || [])];
				newTimeArray.push({ title, colorId });
				newToday[time] = newTimeArray as [SubScheduleItem];
				const newSubSchedule = {
						...prevState,
						today: newToday,
				};

				localStorage.setItem("subScheduleData", JSON.stringify(newSubSchedule));
				return newSubSchedule;
		});
	}

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
									${kst.tohour == time ? "bg-blue-500 text-slate-50 scale-120" : "bg-slate-300 text-slate-950"}
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
										rounded-lg w-full bg-slate-200 relative p-1 flex gap-1
									`}
									style={{ height: `${height}rem` }}
									onClick={() => handleSetSubSchedule(time)}
								>
									<div className={`
										w-2 h-full rounded-full
										${ScheduleUtil.getColorById(
											schedule[kst.today]?.[time]?.colorId
										)}
									`}>
									</div>
									<div className="flex flex-col text-xs gap-1 flex-wrap">
										{schedule[kst.today]?.[time] && (
											<div className="text-slate-600 font-bold">
												{schedule[kst.today][time].title || ""}
											</div>
										)}
										{subSchedule?.today?.[time]?.map((sub, index) => (
											<div 
												key={`today-${time}-${index}`}
												className={`${ScheduleUtil.getColorById(sub.colorId)} text-slate-50 px-2 rounded-full`}
											>
												{sub.title}
											</div>
										))}
									</div>
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
