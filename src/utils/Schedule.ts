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

export type { ScheduleItem, ScheduleState };
