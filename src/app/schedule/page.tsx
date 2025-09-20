"use client";

import { useState } from "react";

type ScheduleItem = {
  title: string;
  long: number;
  color: string;
};

type ScheduleState = {
  [day: number]: {
    [time: number]: ScheduleItem;
  };
};

const headerStyle = "bg-slate-300 rounded-lg shrink-0";
const colors = [
  "bg-red-500", "bg-orange-500", "bg-amber-500", "bg-yellow-500",
  "bg-lime-500", "bg-green-500", "bg-emerald-500", "bg-teal-500",
  "bg-cyan-500", "bg-sky-500", "bg-blue-500", "bg-indigo-500",
  "bg-violet-500", "bg-purple-500", "bg-fuchsia-500", "bg-pink-500", "bg-rose-500"
];

const Schedule = () => {
  const [schedule, setSchedule] = useState<ScheduleState>({});

  const handleSetSchedule = (time: number, day: number) => {
    const title = prompt("일정 입력", "");
    const long = Number(prompt("시간 입력", ""));
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (!title) return;

    setSchedule((prev) => {
      const newSchedule = { ...prev };
      if (!newSchedule[day]) newSchedule[day] = {};
      newSchedule[day][time] = { title, long: long || 1, color };
      return newSchedule;
    });
  };

  return (
		<>
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
						{Array.from({ length: 18 }, (_, i) => i + 7).map((time) => (
							<div key={time} className="bg-slate-300 rounded-lg w-6 h-16 text-center font-bold">{time}</div>
						))}
					</div>
					{[0, 1, 2, 3, 4].map((day) => (
            <div key={day} className="flex flex-col gap-1 w-full">
              {Array.from({ length: 18 }, (_, i) => i + 7).map((time) => {
                const item = schedule[day]?.[time];

                const isCovered = Object.entries(schedule[day] || {}).some(([start, v]) => {
                  const s = Number(start);
                  return v.long > 1 && time > s && time < s + v.long;
                });

                if (isCovered) {
                  return <div key={`${day}-${time}`} className="hidden" />
                }

                const l = item?.long || 1;
                const rowHeight = 4;   // 1칸 = 4rem
                const gapHeight = 0.25; // gap-1 = 0.25rem
                const height = rowHeight * l + gapHeight * (l - 1);

                return (
                  <div 
                    key={`${day}-${time}`}
                    onClick={() => handleSetSchedule(time, day)}
                    className={`text-slate-50 text-lg rounded-lg w-16 p-1 overflow-hidden break-words ${schedule[day]?.[time]?.color || "bg-slate-200"}`}
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