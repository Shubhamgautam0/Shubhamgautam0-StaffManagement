// Import staff data for cross-reference
import { type StaffMember, staffData } from './staffData';

// Shift related interfaces
export interface Shift {
  id: string;
  siteId: string;
  siteName: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  staffRequired: number;
  assignedStaff: string[]; // Staff IDs
  assignedStaffNames: string[]; // Staff Names for display
  assignedStaffInitials: string[]; // Staff Initials for avatars
  assignedStaffDetails?: StaffMember[]; // Full staff details for easy access
  color: string;
  status: 'scheduled' | 'published' | 'completed' | 'cancelled';
  payRate?: string;
  billRate?: string;
}

// Report related interfaces
export interface Report {
  id: string;
  siteId: string;
  siteName: string;
  date: string; // YYYY-MM-DD format
  startTime: string; // HH:mm format
  endTime: string; // HH:mm format
  dutyStatus: 'Duty Started' | 'Duty Not Started' | 'Duty Completed';
  staffName: string;
  staffInitials: string;
  reportStatus: 'All' | 'Not Sent' | 'Approved';
  timeDuration: string;
}

export interface SiteMember {
  id: string;
  name: string;
  customerName: string;
  initials: string;
  phone: string;
  email: string;
  address: string;
  siteId: string;
  status: 'Mysite' | 'Allsite';
  version?: string;
  avatar?: string;
  scheduleDate: string;
  employeeId?: string;
  username?: string;
  unitNumber?: string;
  licenceExpireDate?: string;
  shifts?: { [date: string]: Shift[] }; 
  reports?: Report[];
}

export const SiteData: SiteMember[] = [
  {
    id: '1',
    name: 'ORANGE TECH HUB',
    customerName: 'Orange County Enterprises',
    initials: 'O',
    phone: '+1 (714) 555-1234',
    email: 'contact@orangetech.com',
    address: '100 Innovation Drive, Irvine, CA 92617',
    siteId: 'ID: 33001',
    status: 'Mysite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {
      '2025-07-14': [
        {
          id: 'shift-1-mon',
          siteId: '1',
          siteName: 'ORANGE TECH HUB',
          date: '2025-07-14',
          startTime: '09:00',
          endTime: '17:00',
          staffRequired: 1,
          assignedStaff: ['1'],
          assignedStaffNames: ['AMERICANGUARD VK'],
          assignedStaffInitials: ['AV'],
          color: '#2196F3',
          status: 'scheduled',
          payRate: 'Standard Rate',
          billRate: 'Standard Bill Rate'
        }
      ],
      '2025-07-15': [
        {
          id: 'shift-1-tue',
          siteId: '1',
          siteName: 'ORANGE TECH HUB',
          date: '2025-07-15',
          startTime: '04:00',
          endTime: '06:00',
          staffRequired: 1,
          assignedStaff: ['6'],
          assignedStaffNames: ['Romeo Lacuesta'],
          assignedStaffInitials: ['RL'],
          color: '#607D8B',
          status: 'scheduled',
          payRate: 'Standard Rate',
          billRate: 'Standard Bill Rate'
        }
      ],
      '2025-07-16': [
        {
          id: 'shift-1-wed',
          siteId: '1',
          siteName: 'ORANGE TECH HUB',
          date: '2025-07-16',
          startTime: '02:00',
          endTime: '06:00',
          staffRequired: 2,
          assignedStaff: [],
          assignedStaffNames: [],
          assignedStaffInitials: [],
          color: '#f44336',
          status: 'scheduled',
          payRate: 'Standard Rate',
          billRate: 'Standard Bill Rate'
        }
      ],
      '2025-07-17': [
        {
          id: 'shift-1-thu',
          siteId: '1',
          siteName: 'ORANGE TECH HUB',
          date: '2025-07-17',
          startTime: '09:00',
          endTime: '17:00',
          staffRequired: 1,
          assignedStaff: ['3'],
          assignedStaffNames: ['Remon G8'],
          assignedStaffInitials: ['RG'],
          color: '#4CAF50',
          status: 'scheduled',
          payRate: 'Standard Rate',
          billRate: 'Standard Bill Rate'
        }
      ],
      '2025-07-18': [
        {
          id: 'shift-1-fri',
          siteId: '1',
          siteName: 'ORANGE TECH HUB',
          date: '2025-07-18',
          startTime: '03:00',
          endTime: '05:00',
          staffRequired: 1,
          assignedStaff: ['8'],
          assignedStaffNames: ['Sally Sms'],
          assignedStaffInitials: ['SS'],
          color: '#009688',
          status: 'scheduled',
          payRate: 'Standard Rate',
          billRate: 'Standard Bill Rate'
        }
      ]
    },
    reports: [
      {
        id: 'report-1',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-10',
        startTime: '04:00',
        endTime: '06:00',
        dutyStatus: 'Duty Started',
        staffName: 'John Doe',
        staffInitials: 'JD',
        reportStatus: 'All',
        timeDuration: '04:00p - 06:00p'
      },
      {
        id: 'report-2',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-09',
        startTime: '04:00',
        endTime: '06:00',
        dutyStatus: 'Duty Started',
        staffName: 'Jane Smith',
        staffInitials: 'JS',
        reportStatus: 'All',
        timeDuration: '04:00p - 06:00p'
      },
      {
        id: 'report-3',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-08',
        startTime: '04:00',
        endTime: '06:00',
        dutyStatus: 'Duty Not Started',
        staffName: 'Mike Johnson',
        staffInitials: 'MJ',
        reportStatus: 'All',
        timeDuration: '04:00p - 06:00p'
      }
    ]
  },
  {
    id: '2',
    name: 'TARGET Pasadena',
    customerName: 'Target Corp',
    initials: 'T',
    phone: '+1 (626) 123-4567',
    email: 'info@targetpasadena.com',
    address: '345 Colorado Blvd, Pasadena, CA 91101',
    siteId: 'ID: 33002',
    status: 'Mysite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {
      '2025-07-15': [
        {
          id: 'shift-2-tue',
          siteId: '2',
          siteName: 'TARGET Pasadena',
          date: '2025-07-15',
          startTime: '06:00',
          endTime: '08:00',
          staffRequired: 1,
          assignedStaff: ['2'],
          assignedStaffNames: ['Nastia Dick'],
          assignedStaffInitials: ['ND'],
          color: '#E91E63',
          status: 'scheduled'
        }
      ],
      '2025-07-17': [
        {
          id: 'shift-2-thu',
          siteId: '2',
          siteName: 'TARGET Pasadena',
          date: '2025-07-17',
          startTime: '06:00',
          endTime: '08:00',
          staffRequired: 2,
          assignedStaff: [],
          assignedStaffNames: [],
          assignedStaffInitials: [],
          color: '#f44336',
          status: 'scheduled'
        }
      ]
    },
    reports: [
      {
        id: 'report-4',
        siteId: '2',
        siteName: 'TARGET Pasadena',
        date: '2025-07-10',
        startTime: '09:00',
        endTime: '17:00',
        dutyStatus: 'Duty Started',
        staffName: 'Alice Brown',
        staffInitials: 'AB',
        reportStatus: 'Approved',
        timeDuration: '09:00a - 17:00p'
      }
    ]
  },
  {
    id: '3',
    name: 'Walmart Express',
    customerName: 'Walmart Inc.',
    initials: 'W',
    phone: '+1 (213) 987-6543',
    email: 'support@walmart.com',
    address: '1600 Broadway, Los Angeles, CA 90015',
    siteId: 'ID: 33003',
    status: 'Mysite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {
      '2025-07-16': [
        {
          id: 'shift-3-wed',
          siteId: '3',
          siteName: 'Walmart Express',
          date: '2025-07-16',
          startTime: '08:00',
          endTime: '08:00',
          staffRequired: 1,
          assignedStaff: ['7'],
          assignedStaffNames: ['SOHIL GUARD'],
          assignedStaffInitials: ['SG'],
          color: '#795548',
          status: 'scheduled'
        }
      ],
      '2025-07-17': [
        {
          id: 'shift-3-thu',
          siteId: '3',
          siteName: 'Walmart Express',
          date: '2025-07-17',
          startTime: '06:00',
          endTime: '08:00',
          staffRequired: 2,
          assignedStaff: [],
          assignedStaffNames: [],
          assignedStaffInitials: [],
          color: '#f44336',
          status: 'scheduled'
        }
      ],
      '2025-07-18': [
        {
          id: 'shift-3-fri',
          siteId: '3',
          siteName: 'Walmart Express',
          date: '2025-07-18',
          startTime: '08:00',
          endTime: '08:00',
          staffRequired: 1,
          assignedStaff: ['3'],
          assignedStaffNames: ['Remon G8'],
          assignedStaffInitials: ['RG'],
          color: '#4CAF50',
          status: 'scheduled'
        }
      ],
      '2025-07-19': [
        {
          id: 'shift-3-sat',
          siteId: '3',
          siteName: 'Walmart Express',
          date: '2025-07-19',
          startTime: '08:00',
          endTime: '08:00',
          staffRequired: 1,
          assignedStaff: ['8'],
          assignedStaffNames: ['Sally Sms'],
          assignedStaffInitials: ['SS'],
          color: '#009688',
          status: 'scheduled'
        }
      ]
    },
    reports: []
  },
  {
    id: '4',
    name: 'Unity Church Center',
    customerName: 'Unity Group',
    initials: 'U',
    phone: '+1 (909) 654-3210',
    email: 'admin@unitycenter.org',
    address: '8900 Church Street, Fontana, CA 92335',
    siteId: 'ID: 33004',
    status: 'Allsite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {},
    reports: []
  },
  {
    id: '5',
    name: 'VANOWEN CENTRAL POST',
    customerName: 'Vanowen Properties',
    initials: 'V',
    phone: '+1 (818) 888-1212',
    email: 'vanowen@support.com',
    address: '1234 Vanowen St, Van Nuys, CA 91405',
    siteId: 'ID: 33005',
    status: 'Allsite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {},
    reports: []
  },
  {
    id: '6',
    name: 'Reseda Field Office',
    customerName: 'Reseda Security Services',
    initials: 'R',
    phone: '+1 (818) 222-3333',
    email: 'field@resedaservices.com',
    address: '4500 Reseda Blvd, Tarzana, CA 91356',
    siteId: 'ID: 33006',
    status: 'Mysite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {},
    reports: []
  },
  {
    id: '7',
    name: 'Best Buy Mission Valley',
    customerName: 'Best Buy Co., Inc.',
    initials: 'B',
    phone: '+1 (619) 555-7788',
    email: 'help@bestbuy.com',
    address: '5658 Mission Center Rd, San Diego, CA 92108',
    siteId: 'ID: 33007',
    status: 'Allsite',
    scheduleDate: 'Last schedule date Jul 10, 2025',
    shifts: {},
    reports: []
  }
];

// Shift-related constants
export const shiftColors = [
  '#4285f4', // Blue
  '#8e6ec8', // Purple
  '#4caf50', // Green
  '#ff9800', // Orange
  '#f44336', // Red
  '#00bcd4', // Cyan
  '#9c27b0', // Deep Purple
  '#795548'  // Brown
];

export const payRates = [
  'Standard Rate',
  'Premium Rate',
  'Holiday Rate',
  'Overtime Rate',
  'Night Shift Rate'
];

export const billRates = [
  'Standard Bill Rate',
  'Premium Bill Rate',
  'Holiday Bill Rate',
  'Emergency Bill Rate'
];

// Helper functions for shifts
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${minutes}${ampm.toLowerCase()}`;
};

export const calculateDuration = (startTime: string, endTime: string): string => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);

  let startTotalMinutes = startHours * 60 + startMinutes;
  let endTotalMinutes = endHours * 60 + endMinutes;

  // Handle overnight shifts
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60;
  }

  const durationMinutes = endTotalMinutes - startTotalMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  return `${hours}:${minutes.toString().padStart(2, '0')} Hrs`;
};

export const formatShiftDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  };
  return date.toLocaleDateString('en-US', options);
};

// Function to get staff by status
export const getStaffByStatus = (status: SiteMember['status']): SiteMember[] => {
  return SiteData.filter(staff => staff.status === status);
};

// Function to get site by ID
export const getSiteById = (siteId: string): SiteMember | undefined => {
  return SiteData.find(site => site.id === siteId);
};

// Function to get shifts for a specific site and date
export const getShiftsForSiteAndDate = (siteId: string, date: string): Shift[] => {
  const site = getSiteById(siteId);
  if (!site || !site.shifts) return [];
  return site.shifts[date] || [];
};

// Function to add shift to a site
export const addShiftToSite = (siteId: string, shift: Shift): boolean => {
  console.log('AddShiftToSite - Adding shift:', shift, 'to site:', siteId);
  const siteIndex = SiteData.findIndex(site => site.id === siteId);
  console.log('AddShiftToSite - Site index:', siteIndex);

  if (siteIndex === -1) {
    console.error('AddShiftToSite - Site not found:', siteId);
    return false;
  }

  if (!SiteData[siteIndex].shifts) {
    SiteData[siteIndex].shifts = {};
    console.log('AddShiftToSite - Created shifts object for site');
  }

  if (!SiteData[siteIndex].shifts![shift.date]) {
    SiteData[siteIndex].shifts![shift.date] = [];
    console.log('AddShiftToSite - Created date array for:', shift.date);
  }

  SiteData[siteIndex].shifts![shift.date].push(shift);
  console.log('AddShiftToSite - Shift added successfully. Site shifts:', SiteData[siteIndex].shifts);
  return true;
};

// Cross-reference utility functions
export const getStaffDetailsForShift = (shift: Shift): StaffMember[] => {
  return staffData.filter(staff => shift.assignedStaff.includes(staff.id));
};

export const getShiftsForStaff = (staffId: string, dateRange?: { start: Date; end: Date }): Array<Shift & { siteName: string; siteId: string }> => {
  const allShifts: Array<Shift & { siteName: string; siteId: string }> = [];

  SiteData.forEach(site => {
    if (site.shifts) {
      Object.entries(site.shifts).forEach(([date, shifts]) => {
        // Filter by date range if provided
        if (dateRange) {
          const shiftDate = new Date(date);
          if (shiftDate < dateRange.start || shiftDate > dateRange.end) {
            return;
          }
        }

        shifts.forEach(shift => {
          if (shift.assignedStaff.includes(staffId)) {
            allShifts.push({
              ...shift,
              siteName: site.name,
              siteId: site.id
            });
          }
        });
      });
    }
  });

  return allShifts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getStaffForSite = (siteId: string, dateRange?: { start: Date; end: Date }): Array<{ staff: StaffMember; shifts: Shift[] }> => {
  const site = getSiteById(siteId);
  if (!site || !site.shifts) return [];

  const staffShiftsMap = new Map<string, Shift[]>();

  Object.entries(site.shifts).forEach(([date, shifts]) => {
    // Filter by date range if provided
    if (dateRange) {
      const shiftDate = new Date(date);
      if (shiftDate < dateRange.start || shiftDate > dateRange.end) {
        return;
      }
    }

    shifts.forEach(shift => {
      shift.assignedStaff.forEach(staffId => {
        if (!staffShiftsMap.has(staffId)) {
          staffShiftsMap.set(staffId, []);
        }
        staffShiftsMap.get(staffId)!.push(shift);
      });
    });
  });

  // Convert to array with staff details
  const result: Array<{ staff: StaffMember; shifts: Shift[] }> = [];
  staffShiftsMap.forEach((shifts, staffId) => {
    const staff = staffData.find((s: StaffMember) => s.id === staffId);
    if (staff) {
      result.push({ staff, shifts });
    }
  });

  return result;
};