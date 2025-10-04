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
}

type TodoState = [TodoItem]

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
  "bg-red-100",
  "bg-amber-100",
  "bg-lime-100",
  "bg-emerald-100",
  "bg-sky-100",
  "bg-blue-100",
  "bg-purple-100",
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