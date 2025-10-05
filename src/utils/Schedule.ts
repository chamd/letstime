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
  id: string;
  title: string;
  colorId: number;
}

type SubScheduleState = {
  [day in SubScheduleDay]: {
    [item: number]: [SubScheduleItem];
  };
};

type TodoItem = {
  id: string;
  title: string;
  colorId: number;
  done: boolean;
}

type TodoState = TodoItem[];

const colors = [
  "bg-red-400",
  "bg-amber-400",
  "bg-lime-400",
  "bg-emerald-400",
  "bg-sky-400",
  "bg-blue-400",
  "bg-purple-400",
];

const lightColors = [
  "bg-red-200",
  "bg-amber-200",
  "bg-lime-200",
  "bg-emerald-200",
  "bg-sky-200",
  "bg-blue-200",
  "bg-purple-200",
];

const getColorById = (id: number, type: string = "normal"): string => {
  if (type == "normal") {
    return colors[id] ?? "bg-white";
  } else if (type == "light") {
    return lightColors[id] ?? "bg-white";
  }
  return "bg-white";
}

const ScheduleUtil = { colors, getColorById };

export type { ScheduleItem, ScheduleState, SubScheduleDay, SubScheduleItem, SubScheduleState, TodoItem, TodoState }
export default ScheduleUtil;