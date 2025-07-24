// Timesheet Settings Data

export interface WorkWeekSettings {
  startDay: string;
  workWeekDisplay: string;
}

export interface TimeFormatSettings {
  format: '12-hour' | '24-hour';
  description: string;
}

export interface OvertimeRule {
  weeklyOvertimeAfter: number;
  dailyOvertimeAfter: number;
  dailyDoubletimeAfter: number;
  californiaRule: boolean;
  californiaRuleDescription: string;
}

export interface PayrollTimeSettings {
  type: 'schedule-time' | 'clock-in-time';
  roundUpTime?: string;
  roundUpDescription?: string;
}

export interface DayNightTimeRule {
  enabled: boolean;
  dayStart: string;
  dayEnd: string;
  description: string;
}

export interface BreakType {
  id: string;
  name: string;
  type: 'Unpaid' | 'Paid';
  duration: string;
}

export interface BreaksSettings {
  enabled: boolean;
  type: 'manual' | 'automatic';
  manualDescription: string;
  automaticDescription: string;
  breakTypes: BreakType[];
}

export interface HolidaySettings {
  enabled: boolean;
  instructions: string;
  ruleBasedOn: string;
  holidays: Holiday[];
  shiftBased: boolean;
  shiftBasedDescription: string;
  excludeDayNight: boolean;
  excludeDayNightDescription: string;
}

export interface Holiday {
  id: string;
  year: string;
  date: string;
  name: string;
}

export interface WeekendTimeRule {
  enabled: boolean;
  description: string;
}

// Default data
export const defaultWorkWeekSettings: WorkWeekSettings = {
  startDay: 'tuesday',
  workWeekDisplay: 'Work week Tue-Mon'
};

export const defaultTimeFormatSettings: TimeFormatSettings = {
  format: '12-hour',
  description: 'This will change the time format for your entire system in all platforms'
};

export const defaultOvertimeRule: OvertimeRule = {
  weeklyOvertimeAfter: 0,
  dailyOvertimeAfter: 0,
  dailyDoubletimeAfter: 0,
  californiaRule: false,
  californiaRuleDescription: 'This rule states that the employee is entitled overtime if they work seven days regularly in the work week. The first 8 hours on the 7th consecutive Day will be considered as Overtime and the hours beyond 8 will fall under doubletime.'
};

export const defaultPayrollTimeSettings: PayrollTimeSettings = {
  type: 'schedule-time'
};

export const defaultDayNightTimeRule: DayNightTimeRule = {
  enabled: false,
  dayStart: '06:00a',
  dayEnd: '06:00p',
  description: 'Day shift - 06:00a to 06:00p | Night shift - 06:00p to 06:00a'
};

export const defaultBreaksSettings: BreaksSettings = {
  enabled: true,
  type: 'manual',
  manualDescription: 'Manually added breaks allow users to track their break time during their work day with a dedicated "take a break" button',
  automaticDescription: 'Set automatic unpaid breaks for your users',
  breakTypes: [
    {
      id: '1',
      name: 'Break Name',
      type: 'Unpaid',
      duration: '5 mins'
    },
    {
      id: '2',
      name: 'Tea Break',
      type: 'Paid',
      duration: '15 mins'
    }
  ]
};

export const defaultHolidaySettings: HolidaySettings = {
  enabled: true,
  instructions: 'Instructions: You can include Holidays hrs from "Edit Columns" in Timesheet',
  ruleBasedOn: 'Shift Start Time',
  holidays: [],
  shiftBased: true,
  shiftBasedDescription: 'Shifts Starting between 00.00hrs - 23.59hrs on a Holiday hrs. Overlapping shifts will be calculated according to the start time of the shift.',
  excludeDayNight: true,
  excludeDayNightDescription: 'On Holiday Times the day and Night time will be 0 hrs. Reason-it can avoid paying double hrs if you are paying Both Day/night hrs + Holiday hrs (Default - On)'
};

export const defaultWeekendTimeRule: WeekendTimeRule = {
  enabled: false,
  description: 'Weekend time rule settings'
};
