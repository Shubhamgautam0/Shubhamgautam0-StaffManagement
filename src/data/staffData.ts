// Import site data for cross-reference
import { type SiteMember } from './siteData';

export interface TimeSlot {
  day: string;
  startTime: string;
  endTime: string;
}

export interface VacationPeriod {
  from: string;
  to: string;
}

export interface StaffAvailability {
  type: 'fullTime' | 'partTime';
  timeSlots: TimeSlot[];
  vacationPeriods: VacationPeriod[];
}

export interface StaffLicence {
  id: string;
  type: string;
  number: string;
  expiryDate: string;
}

export interface StaffDutySettings {
  clockInOut: 'default' | 'enabled' | 'disabled';
  emailNotifications: 'default' | 'enable' | 'disable';
}



export interface StaffRecord {
  id: string;
  type: 'information' | 'note';
  title: string;
  content: string;
  date: string;
  createdBy?: string;
}

export interface StaffInformationData {
  personalDetails: {
    dateOfBirth?: string;
    nationality?: string;
    emergencyContact?: string;
    emergencyPhone?: string;
  };
  employmentDetails: {
    startDate?: string;
    position?: string;
    department?: string;
    supervisor?: string;
    employmentType?: string;
  };
  additionalInfo: {
    notes?: string;
    skills?: string[];
    certifications?: string[];
  };
}

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
  availability?: StaffAvailability; // Staff availability information
  licences?: StaffLicence[]; // Staff licences and certifications
  dutySettings?: StaffDutySettings; // Staff duty settings
  staffInformation?: StaffInformationData; // Additional staff information
  records?: StaffRecord[]; // Staff records and notes
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
    assignedSites: ['1', '2'],
    availability: {
      type: 'fullTime',
      timeSlots: [],
      vacationPeriods: [
        { from: '2025-07-20', to: '2025-07-21' },
      ]
    },
    licences: [
      {
        id: '1',
        type: 'Security Worker Licence',
        number: '54154514501',
        expiryDate: '2025-02-21'
      },
      {
        id: '2',
        type: 'Driving License',
        number: 'DL123456789',
        expiryDate: '2026-05-15'
      }
    ],
    dutySettings: {
      clockInOut: 'enabled',
      emailNotifications: 'enable'
    },
    staffInformation: {
      personalDetails: {
        dateOfBirth: '1990-05-15',
        nationality: 'American',
        emergencyContact: 'John Doe',
        emergencyPhone: '+1 (555) 123-4567'
      },
      employmentDetails: {
        startDate: '2023-01-15',
        position: 'Security Guard',
        department: 'Security',
        supervisor: 'Mike Johnson',
        employmentType: 'Full-time'
      },
      additionalInfo: {
        notes: 'Experienced security professional with excellent communication skills.',
        skills: ['Security Operations', 'Emergency Response', 'Customer Service'],
        certifications: ['Security License', 'First Aid']
      }
    },
    records: [
      {
        id: '1',
        type: 'information',
        title: 'Staff Information Updated',
        content: 'Personal and employment details have been updated for AMERICANGUARD VK',
        date: '2025-07-20',
        createdBy: 'System'
      },
      {
        id: '2',
        type: 'note',
        title: 'Performance Review',
        content: 'Excellent performance during night shift duties. Shows great attention to detail and follows all security protocols.',
        date: '2025-07-18',
        createdBy: 'Mike Johnson'
      }
    ]
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
    assignedSites: ['3'],
    availability: {
      type: 'partTime',
      timeSlots: [
        { day: 'M', startTime: '09:00', endTime: '17:00' },
        { day: 'W', startTime: '09:00', endTime: '17:00' },
        { day: 'F', startTime: '09:00', endTime: '17:00' }
      ],
      vacationPeriods: []
    }
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

// Update staff availability
export const updateStaffAvailability = (staffId: string, availability: StaffAvailability): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  staffData[staffIndex].availability = availability;
  return true;
};

// Get staff availability
export const getStaffAvailability = (staffId: string): StaffAvailability | null => {
  const staff = staffData.find(staff => staff.id === staffId);
  return staff?.availability || null;
};

// Add licence to staff
export const addStaffLicence = (staffId: string, licence: Omit<StaffLicence, 'id'>): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  if (!staffData[staffIndex].licences) {
    staffData[staffIndex].licences = [];
  }

  const newLicence: StaffLicence = {
    ...licence,
    id: Date.now().toString()
  };

  staffData[staffIndex].licences!.push(newLicence);
  return true;
};

// Get staff licences
export const getStaffLicences = (staffId: string): StaffLicence[] => {
  const staff = staffData.find(staff => staff.id === staffId);
  return staff?.licences || [];
};

// Remove staff licence
export const removeStaffLicence = (staffId: string, licenceId: string): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  if (staffData[staffIndex].licences) {
    staffData[staffIndex].licences = staffData[staffIndex].licences!.filter(
      licence => licence.id !== licenceId
    );
  }

  return true;
};

// Update staff duty settings
export const updateStaffDutySettings = (staffId: string, dutySettings: StaffDutySettings): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  staffData[staffIndex].dutySettings = dutySettings;
  return true;
};

// Get staff duty settings
export const getStaffDutySettings = (staffId: string): StaffDutySettings | null => {
  const staff = staffData.find(staff => staff.id === staffId);
  return staff?.dutySettings || null;
};

// Update staff information
export const updateStaffInformation = (staffId: string, staffInformation: StaffInformationData): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  staffData[staffIndex].staffInformation = staffInformation;

  // Create a record entry for this update
  const record: StaffRecord = {
    id: Date.now().toString(),
    type: 'information',
    title: 'Staff Information Updated',
    content: `Personal and employment details have been updated for ${staffData[staffIndex].name}`,
    date: new Date().toISOString().split('T')[0],
    createdBy: 'System'
  };

  if (!staffData[staffIndex].records) {
    staffData[staffIndex].records = [];
  }
  staffData[staffIndex].records!.unshift(record);

  return true;
};

// Get staff information
export const getStaffInformation = (staffId: string): StaffInformationData | null => {
  const staff = staffData.find(staff => staff.id === staffId);
  return staff?.staffInformation || null;
};

// Add staff record/note
export const addStaffRecord = (staffId: string, record: Omit<StaffRecord, 'id'>): boolean => {
  const staffIndex = staffData.findIndex(staff => staff.id === staffId);
  if (staffIndex === -1) return false;

  if (!staffData[staffIndex].records) {
    staffData[staffIndex].records = [];
  }

  const newRecord: StaffRecord = {
    ...record,
    id: Date.now().toString()
  };

  staffData[staffIndex].records!.unshift(newRecord);
  return true;
};

// Get staff records
export const getStaffRecords = (staffId: string): StaffRecord[] => {
  const staff = staffData.find(staff => staff.id === staffId);
  return staff?.records || [];
};



export default staffData;

