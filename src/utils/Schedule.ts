type ScheduleItem = {
  title: string;
  long: number;
  colorId: number;
};

type ScheduleState = {
  [day: number]: {
    [time: number]: ScheduleItem;
  };
};

enum SubScheduleDay { 
  Yesterday = 'yesterday',
  Today = 'today',
  Tomorrow = 'tomorrow'
};
type SubScheduleItem = {
  title: string;
  colorId: number;
}

type SubScheduleState = {
  [day in SubScheduleDay]: {
    [item: number]: [SubScheduleItem];
  };
};

const colors = [
  "bg-red-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-purple-400",
];

const getColorById = (id: number): string => {
  return colors[id] ?? "bg-slate-200";
}

const ScheduleUtil = { colors, getColorById };

export type { ScheduleItem, ScheduleState, SubScheduleDay, SubScheduleItem, SubScheduleState }
export default ScheduleUtil;