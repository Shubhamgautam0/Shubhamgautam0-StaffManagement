// Import site data for cross-reference
import { type SiteMember } from './siteData';

export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Disabled' | 'Old Version';
  version?: string;
  avatar?: string;
  gender: string;
  employeeId?: string;
  username?: string;
  unitNumber?: string;
  licenceExpireDate?: string;
  color?: string; // Color for staff identification
  assignedSites?: string[]; // Array of site IDs assigned to this staff
  currentShifts?: Array<{
    siteId: string;
    siteName: string;
    date: string;
    startTime: string;
    endTime: string;
    shiftId: string;
  }>; // Current active shifts
}

export const staffData: StaffMember[] = [
  {
    id: '1',
    name: 'AMERICANGUARD VK',
    initials: 'AV',
    phone: '+1 (626) 448-5612',
    email: 'valerieavette@email.com',
    address: 'Address not available',
    status: 'Active',
    gender: 'Male',
    color: '#2196F3',
    assignedSites: ['1', '2']
  },
  {
    id: '2',
    name: 'Nastia Dick',
    initials: 'ND',
    phone: '+1 (562) 450-9446',
    email: 'nastia.dick@email.com',
    address: '123 Main St, Los Angeles, CA',
    status: 'Old Version',
    version: 'Old Version',
    gender: 'Female',
    color: '#E91E63',
    assignedSites: ['3']
  },
  {
    id: '3',
    name: 'Remon G8',
    initials: 'RG',
    phone: '+1 (818) 310-0183',
    email: 'remon.g8@email.com',
    address: '456 Oak Ave, Burbank, CA',
    status: 'Active',
    gender: 'Female',
    color: '#4CAF50',
    assignedSites: ['3', '4']
  },
  {
    id: '4',
    name: 'Richard Ibarrazaar',
    initials: 'RI',
    phone: '+1 (747) 724-4789',
    email: 'richard.ibarrazaar@email.com',
    address: '789 Pine St, Glendale, CA',
    status: 'Disabled',
    gender: 'Male',
    color: '#FF9800',
    assignedSites: []
  },
  {
    id: '5',
    name: 'Richardo Yumul',
    initials: 'RY',
    phone: '+1 (714) 721-9574',
    email: 'richardo.yumul@email.com',
    address: '321 Elm Dr, Orange, CA',
    status: 'Disabled',
    gender: 'Male',
    color: '#9C27B0',
    assignedSites: []
  },
  {
    id: '6',
    name: 'Romeo Lacuesta',
    initials: 'RL',
    phone: '+1 (818) 293-6723',
    email: 'romeo.lacuesta@email.com',
    address: '654 Maple Ln, Van Nuys, CA',
    status: 'Active',
    gender: 'Male',
    color: '#607D8B',
    assignedSites: ['1', '2']
  },
  {
    id: '7',
    name: 'SOHIL GUARD',
    initials: 'SG',
    phone: '+1 (213) 213-2134',
    email: 'sohil.guard@email.com',
    address: '987 Cedar Blvd, Los Angeles, CA',
    status: 'Old Version',
    version: 'Old Version',
    gender: 'Male',
    color: '#795548',
    assignedSites: ['5']
  },
  {
    id: '8',
    name: 'Sally Sms',
    initials: 'SS',
    phone: '+1 (555) 123-4567',
    email: 'sally.sms@email.com',
    address: '147 Birch St, Pasadena, CA',
    status: 'Active',
    gender: 'Male',
    color: '#009688',
    assignedSites: ['3', '4']
  }
];
// Function to get staff by status
export const getStaffByStatus = (status: StaffMember['status']): StaffMember[] => {
  return staffData.filter(staff => staff.status === status);
};

// Cross-reference utility functions
export const getStaffById = (staffId: string): StaffMember | undefined => {
  return staffData.find(staff => staff.id === staffId);
};

export const getStaffByName = (name: string): StaffMember | undefined => {
  return staffData.find(staff => staff.name.toLowerCase().includes(name.toLowerCase()));
};

export const getStaffBySite = (siteId: string): StaffMember[] => {
  return staffData.filter(staff => staff.assignedSites?.includes(siteId));
};

export const getActiveStaff = (): StaffMember[] => {
  return staffData.filter(staff => staff.status === 'Active');
};

export const updateStaffShifts = (staffId: string, shifts: Array<{
  siteId: string;
  siteName: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftId: string;
}>): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  staffData[staffIndex].currentShifts = shifts;
  return true;
};

export const addSiteToStaff = (staffId: string, siteId: string): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  if (!staffData[staffIndex].assignedSites) {
    staffData[staffIndex].assignedSites = [];
  }

  if (!staffData[staffIndex].assignedSites!.includes(siteId)) {
    staffData[staffIndex].assignedSites!.push(siteId);
  }

  return true;
};

export const removeSiteFromStaff = (staffId: string, siteId: string): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  if (staffData[staffIndex].assignedSites) {
    staffData[staffIndex].assignedSites = staffData[staffIndex].assignedSites!.filter(id => id !== siteId);
  }

  return true;
};

export default staffData;

