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
  shifts: Shift[]; // Added shifts array
  reports: Report[]; // Added reports array
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
    shifts: [
      {
        id: 'shift-1',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-18',
        startTime: '04:00',
        endTime: '06:00',
        staffRequired: 1,
        assignedStaff: ['1', '3'],
        assignedStaffNames: ['AMERICANGUARD VK', 'Remon G8'],
        assignedStaffInitials: [],
        color: '#4285f4',
        status: 'scheduled',
        payRate: 'Standard Rate',
        billRate: 'Standard Bill Rate'
      },
      {
        id: 'shift-1a',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-19', // Tomorrow's date
        startTime: '09:00',
        endTime: '17:00',
        staffRequired: 2,
        assignedStaff: ['6'],
        assignedStaffNames: ['Romeo Lacuesta'],
        assignedStaffInitials: ['RL'],
        color: '#8e6ec8',
        status: 'scheduled',
        payRate: 'Standard Rate',
        billRate: 'Standard Bill Rate'
      },
      {
        id: 'shift-1b',
        siteId: '1',
        siteName: 'ORANGE TECH HUB',
        date: '2025-07-20', // Day after tomorrow
        startTime: '06:00',
        endTime: '14:00',
        staffRequired: 1,
        assignedStaff: ['8'],
        assignedStaffNames: ['Sally Sms'],
        assignedStaffInitials: [],
        color: '#ff9800',
        status: 'scheduled',
        payRate: 'Standard Rate',
        billRate: 'Standard Bill Rate'
      }
    ],
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
    shifts: [
      {
        id: 'shift-2',
        siteId: '2',
        siteName: 'TARGET Pasadena',
        date: '2025-07-18',
        startTime: '09:00',
        endTime: '17:00',
        staffRequired: 2,
        assignedStaff: ['2', '4'],
        assignedStaffNames: ['Nastia Dick', 'Richard Ibarrazaar'],
        assignedStaffInitials: [],
        color: '#8e6ec8',
        status: 'scheduled'
      },
      {
        id: 'shift-2a',
        siteId: '2',
        siteName: 'TARGET Pasadena',
        date: '2025-07-19', // Tomorrow's date
        startTime: '06:00',
        endTime: '14:00',
        staffRequired: 1,
        assignedStaff: ['5'],
        assignedStaffNames: ['Richardo Yumul'],
        assignedStaffInitials: [],
        color: '#4caf50',
        status: 'scheduled'
      },
      {
        id: 'shift-2b',
        siteId: '2',
        siteName: 'TARGET Pasadena',
        date: '2025-07-20', // Day after tomorrow
        startTime: '10:00',
        endTime: '18:00',
        staffRequired: 2,
        assignedStaff: ['7', '1'],
        assignedStaffNames: ['SOHIL GUARD', 'AMERICANGUARD VK'],
        assignedStaffInitials: [],
        color: '#e91e63',
        status: 'scheduled'
      }
    ],
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
    shifts: [],
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
    shifts: [],
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
    shifts: [],
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
    shifts: [],
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
    shifts: [],
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
  if (!site) return [];
  return site.shifts.filter(shift => shift.date === date);
};

// Function to add shift to a site
export const addShiftToSite = (siteId: string, shift: Shift): boolean => {
  const siteIndex = SiteData.findIndex(site => site.id === siteId);
  if (siteIndex === -1) return false;

  SiteData[siteIndex].shifts.push(shift);
  return true;
};