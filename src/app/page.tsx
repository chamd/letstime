"use client";

import { useState, useEffect, useMemo } from "react";
import ScheduleUtil, { ScheduleState, SubScheduleItem, SubScheduleState } from "@/utils/Schedule";
import useModal from "@/hooks/useModal";
import { AnimatePresence } from "framer-motion";
import SubScheduleModal from "@/components/SubScheduleModal";

const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
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
						{Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR).map((time) => (
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
												className={`${ScheduleUtil.getColorById(sub.colorId)} text-slate-50 px-2 rounded-full w-auto text-center`}
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
