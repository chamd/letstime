"use client";

import { useState, useEffect, useMemo } from "react";
import ScheduleUtil, { ScheduleState, SubScheduleItem, SubScheduleState } from "@/utils/Schedule";
import useModal from "@/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import SubScheduleModal from "@/components/SubScheduleModal";

const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const timeZone = 'Asia/Seoul';
const TOTAL_HOURS = 17;
const START_HOUR = 7;

const Home = () => {
	const [schedule, setSchedule] = useState<ScheduleState>({});
	const [subSchedule, setSubSchedule] = useState<SubScheduleState>({
		yesterday: {},
		today: {},
		tomorrow: {}
	});
	const [now, setNow] = useState(new Date());
	const [selectedTime, setSelectedTime] = useState<number>(START_HOUR);
	const [selectedItem, setSelectedItem] = useState<SubScheduleItem | null>(null);
	const { isOpen, open, close } = useModal();
	
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
      tomonth: d.getMonth() + 1,
      todate: d.getDate(),
      tohour: d.getHours(),
    };
  }, [now]);

	const handleSubmit = (data: SubScheduleItem) => {
		setSubSchedule((prev) => {
				const newToday = { ...(prev.today || {}) };
				const newTimeArray = [...(newToday[selectedTime] || [])];
				const index = newTimeArray.findIndex(o => o.id === data.id)
				if (index > -1) {
					newTimeArray[index] = data;
				} else {
					newTimeArray.push(data);
				}
				newToday[selectedTime] = newTimeArray as [SubScheduleItem];
				const newSubSchedule = {
						...prev,
						today: newToday,
				};

				localStorage.setItem("subScheduleData", JSON.stringify(newSubSchedule));
				return newSubSchedule;
		});
    close();
  };

	const handleDelete = () => {
		setSubSchedule((prev) => {
				const newToday = { ...(prev.today || {}) };
				const newTimeArray = [...(newToday[selectedTime] || [])];
				const index = newTimeArray.findIndex(o => o.id === selectedItem?.id)
				if (index > -1) {
					newTimeArray.splice(index, 1);
				}
				newToday[selectedTime] = newTimeArray as [SubScheduleItem];
				const newSubSchedule = {
						...prev,
						today: newToday,
				};

				localStorage.setItem("subScheduleData", JSON.stringify(newSubSchedule));
				return newSubSchedule;
		});
    close();
  };

	const handleAddSubSchedule = (t: number) => {
		setSelectedTime(t);
		setSelectedItem(null);
		open();
	}

	const handleSetSubSchedule = (
		e: React.MouseEvent<HTMLDivElement, MouseEvent>, 
		t: number,
		item: SubScheduleItem
	) => {
		e.stopPropagation();
		setSelectedTime(t);
		setSelectedItem(item);
		open();
	}

	return (
		<>
			<AnimatePresence>
        {isOpen && (
          <SubScheduleModal
            onClose={close}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            selectedItem={selectedItem}
          />
        )}
      </AnimatePresence>
			<div className="w-full mx-auto p-4">
				<div className="
					w-full h-18 mb-4 
					text-white font-semibold text-center text-xl leading-18
					rounded-xl shadow-md
					bg-linear-to-r from-blue-400 via-sky-400 to-cyan-400
				">
					{kst.tomonth}/{kst.todate}({dayNames[kst.today]}) {kst.tohour}시
				</div>

				<div className="flex flex-row gap-1 pb-0">
					<div className="flex flex-col gap-1">
						{Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR).map((time) => (
							<div 
								key={time} 
								className={`
									rounded-xl w-6 h-18 text-center font-bold duration-200 shadow-md
									${kst.tohour == time ? "bg-blue-500 text-white scale-120" : "bg-slate-300 text-black"}
								`}
							>
									{time}
							</div>
						))}
					</div>
					<div className="flex flex-col gap-1 w-full">
						{Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR).map((time) => {
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
							const rowHeight = 4.5;
							const gapHeight = 0.25;
							const height = rowHeight * l + gapHeight * (l - 1);

							return (
								<div
									key={`${kst.today}-${time}`}
									className={`
										rounded-xl w-full relative p-2 flex gap-1 shadow-md
										${ScheduleUtil.getColorById(
											schedule[kst.today]?.[time]?.colorId,
											"light"
										)}
									`}
									style={{ height: `${height}rem` }}
									onClick={() => handleAddSubSchedule(time)}
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
												className={`${ScheduleUtil.getColorById(sub.colorId)} text-white px-2 rounded-full w-auto text-center duration-100 active:scale-95`}
												onClick={(e) => handleSetSubSchedule(e, time, sub)}
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
