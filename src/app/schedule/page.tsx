"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { IoMoon, IoSunny } from "react-icons/io5";
import ScheduleModal from "@/components/ScheduleModal";
import ScheduleUtil, { ScheduleItem, ScheduleState } from "@/utils/Schedule";
import useModal from "@/hooks/useModal";

const headerStyle = "bg-slate-300 rounded-lg shrink-0";
const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
const weekDays = [1, 2, 3, 4, 5];
const weekendDays = [6, 0];
const TOTAL_HOURS = 17;
const START_HOUR = 7;

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleState>({});
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [selectedTime, setSelectedTime] = useState<number>(7);
  const [isWeekend, setIsWeekend] = useState<boolean>(false);
  const { isOpen, open, close } = useModal();
  
  useEffect(() => {
    const scheduleData = localStorage.getItem("scheduleData");
    const scheduleObject = JSON.parse(scheduleData || "{}");
    setSchedule(scheduleObject);
  }, [])

  const handleSetSchedule = (t: number, d: number): void => {
    setSelectedTime(t);
    setSelectedDay(d);
    open();
  };
  
  const handleSubmit = (data: ScheduleItem): void => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      if (!newSchedule[selectedDay]) newSchedule[selectedDay] = {};
      newSchedule[selectedDay][selectedTime] = data;
      localStorage.setItem("scheduleData", JSON.stringify(newSchedule));
      return newSchedule;
    });
    close();
  };

  const handleDelete = (): void => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      delete newSchedule[selectedDay][selectedTime];      
      localStorage.setItem("scheduleData", JSON.stringify(newSchedule));
      return newSchedule;
    });
    close();
  }

  const getSelectedItem = (): ScheduleItem => {
    return schedule[selectedDay]?.[selectedTime];
  }  

  const toogleView = (): void => {
    setIsWeekend(prev => !prev);
  }

  return (
		<>
      <AnimatePresence>
        {isOpen && (
          <ScheduleModal
            onClose={close}
            onSubmit={handleSubmit}
            onDelete={handleDelete}
            selectedItem={getSelectedItem()}
          />
        )}
      </AnimatePresence>
			<div className="w-full max-w-91 flex flex-col gap-1 mx-auto py-2">
				<div className="flex flex-row gap-1 h-6 text-center font-bold w-full justify-center">
					<div 
            onClick={toogleView}
            className={`${headerStyle} w-6 flex items-center justify-center text-xl duration-100 active:scale-90`}
          >
            {isWeekend ? <IoMoon /> : <IoSunny />}
          </div>
          {(isWeekend ? weekendDays : weekDays).map((day) => (
            <div key={day} className={`${headerStyle} ${isWeekend ? "w-41" : "w-16"}`}>{dayNames[day]}</div>
          ))}
				</div>
				<div className="flex flex-row gap-1 justify-center">
					<div className="flex flex-col gap-1">
						{Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR).map((time) => (
							<div key={time} className="bg-slate-300 rounded-lg w-6 h-16 text-center font-bold">{time}</div>
						))}
					</div>
					{(isWeekend ? weekendDays : weekDays).map((day) => (
            <div key={day} className="flex flex-col gap-1">
              {Array.from({ length: TOTAL_HOURS }, (_, i) => i + START_HOUR).map((time) => {
                const item = schedule[day]?.[time];

                const isCovered = Object.entries(schedule[day] || {}).some(([start, v]) => {
                  const s = Number(start);
                  return v.long > 1 && time > s && time < s + v.long;
                });

                if (isCovered) {
                  return <div key={`${day}-${time}`} className="hidden" />
                }

                const l = item?.long || 1;
                const rowHeight = 4;
                const gapHeight = 0.25;
                const height = rowHeight * l + gapHeight * (l - 1);

                return (
                  <div 
                    key={`${day}-${time}`}
                    onClick={() => handleSetSchedule(time, day)}
                    className={`
                      text-slate-50 text-sm 
                      rounded-lg p-1 overflow-hidden break-words 
                      ${isWeekend ? "w-41" : "w-16"} 
                      ${ScheduleUtil.getColorById(schedule[day]?.[time]?.colorId)}
                    `}
                    style={{ height: `${height}rem` }}
                  >
                    {schedule[day]?.[time]?.title || ""}
                  </div>
                )
              })}
            </div>
          ))}
				</div>
			</div>
		</>
	);
};

export default Schedule;