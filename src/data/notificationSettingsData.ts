// Notification Settings Data

export interface NotificationRule {
  id: string;
  enabled: boolean;
  description: string;
  timeValue: number;
  timeUnit: 'Mins' | 'Hours';
  timing: 'after the start time at' | 'before the start time at';
  emailType: 'Other Email' | 'Manager Email';
}

export interface NotifyManagerSettings {
  startDutyMissed: {
    enabled: boolean;
    description: string;
  };
  emailRules: NotificationRule[];
  staffEndedShiftAlert: {
    enabled: boolean;
    description: string;
  };
  staffRequestAlert: {
    enabled: boolean;
    description: string;
  };
}

export interface NotifyStaffSettings {
  scheduleUpdates: {
    enabled: boolean;
    description: string;
  };
}

// Default data
export const defaultNotifyManagerSettings: NotifyManagerSettings = {
  startDutyMissed: {
    enabled: true,
    description: 'Start Duty Missed - Email Notification'
  },
  emailRules: [
    {
      id: '1',
      enabled: false,
      description: 'Send email if Staff doesn\'t start the duty',
      timeValue: 1,
      timeUnit: 'Mins',
      timing: 'after the start time at',
      emailType: 'Other Email'
    },
    {
      id: '2',
      enabled: false,
      description: 'Send email if Staff doesn\'t start the duty',
      timeValue: 1,
      timeUnit: 'Mins',
      timing: 'after the start time at',
      emailType: 'Other Email'
    },
    {
      id: '3',
      enabled: false,
      description: 'Send email if Staff doesn\'t start the duty',
      timeValue: 1,
      timeUnit: 'Mins',
      timing: 'after the start time at',
      emailType: 'Other Email'
    }
  ],
  staffEndedShiftAlert: {
    enabled: true,
    description: 'Send Notification When Staff Ended the Shift.'
  },
  staffRequestAlert: {
    enabled: true,
    description: 'Send Notification When Staff Sends Any Request To Manager.'
  }
};

export const defaultNotifyStaffSettings: NotifyStaffSettings = {
  scheduleUpdates: {
    enabled: false,
    description: 'Notify staff via email about Schedule Updates'
  }
};
