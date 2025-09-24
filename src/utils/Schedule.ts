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

const colors = ["red", "amber", "lime", "emerald", "sky", "blue", "purple"];

const getColorById = (id: number): string => {    
  if (0 <= id && id <= 6) {
    return `bg-${colors[id]}-400`;
  }
  return "bg-slate-200";
}

const ScheduleUtil = { colors, getColorById };

export type { ScheduleItem, ScheduleState }
export default ScheduleUtil;