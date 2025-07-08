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
    gender: 'Male'
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
    gender: 'Female'
  },
  {
    id: '3',
    name: 'Remon G8',
    initials: 'RG',
    phone: '+1 (818) 310-0183',
    email: 'remon.g8@email.com',
    address: '456 Oak Ave, Burbank, CA',
    status: 'Active',
    gender: 'Female'
  },
  {
    id: '4',
    name: 'Richard Ibarrazaar',
    initials: 'RI',
    phone: '+1 (747) 724-4789',
    email: 'richard.ibarrazaar@email.com',
    address: '789 Pine St, Glendale, CA',
    status: 'Disabled',
    gender: 'Male'
   
  },
  {
    id: '5',
    name: 'Richardo Yumul',
    initials: 'RY',
    phone: '+1 (714) 721-9574',
    email: 'richardo.yumul@email.com',
    address: '321 Elm Dr, Orange, CA',
    status: 'Disabled',
    gender: 'Male'
  },
  {
    id: '6',
    name: 'Romeo Lacuesta',
    initials: 'RL',
    phone: '+1 (818) 293-6723',
    email: 'romeo.lacuesta@email.com',
    address: '654 Maple Ln, Van Nuys, CA',
    status: 'Active',
    gender: 'Male'
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
    gender: 'Male'
  },
  {
    id: '8',
    name: 'Sally Sms',
    initials: 'SS',
    phone: '+1 (555) 123-4567',
    email: 'sally.sms@email.com',
    address: '147 Birch St, Pasadena, CA',
    status: 'Active',
    gender: 'Male'
  }
];
// Function to get staff by status
export const getStaffByStatus = (status: StaffMember['status']): StaffMember[] => {
  return staffData.filter(staff => staff.status === status);
};

