"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import ScheduleModal from "@/components/ScheduleModal";
import ScheduleUtil, { ScheduleItem, ScheduleState } from "@/utils/Schedule";
import useModal from "@/hooks/useModal";

const headerStyle = "bg-slate-300 rounded-lg shrink-0";

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleState>({});
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(7);
  const { isOpen, open, close } = useModal();
  
  const handleSetSchedule = (t: number, d: number) => {
    setSelectedTime(t);
    setSelectedDay(d);
    open();
  };
  
  const handleSubmit = (data: ScheduleItem) => {
    setSchedule((prev) => {
      const newSchedule = { ...prev };
      if (!newSchedule[selectedDay]) newSchedule[selectedDay] = {};
      newSchedule[selectedDay][selectedTime] = data;
      localStorage.setItem("scheduleData", JSON.stringify(newSchedule));
      return newSchedule;
    });
    close();
  };

  const handleDelete = () => {
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

  useEffect(() => {
    const scheduleData = localStorage.getItem("scheduleData");
    const scheduleObject = JSON.parse(scheduleData || "{}");
    setSchedule(scheduleObject);
  }, [])
  

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
				<div className="flex flex-row gap-1 h-6 text-center font-bold w-full">
					<div className={`${headerStyle} w-6`}></div>
					<div className={`${headerStyle} w-16`}>월</div>
					<div className={`${headerStyle} w-16`}>화</div>
					<div className={`${headerStyle} w-16`}>수</div>
					<div className={`${headerStyle} w-16`}>목</div>
					<div className={`${headerStyle} w-16`}>금</div>
				</div>
				<div className="flex flex-row gap-1">
					<div className="flex flex-col gap-1">
						{Array.from({ length: 17 }, (_, i) => i + 7).map((time) => (
							<div key={time} className="bg-slate-300 rounded-lg w-6 h-16 text-center font-bold">{time}</div>
						))}
					</div>
					{[1, 2, 3, 4, 5].map((day) => (
            <div key={day} className="flex flex-col gap-1 w-full">
              {Array.from({ length: 17 }, (_, i) => i + 7).map((time) => {
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
                    className={`text-slate-50 text-base rounded-lg w-16 p-1 overflow-hidden break-words ${ScheduleUtil.getColorById(schedule[day]?.[time]?.colorId)}`}
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