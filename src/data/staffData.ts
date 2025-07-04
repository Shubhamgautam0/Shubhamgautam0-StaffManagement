// Staff data for the application
export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  phone: string;
  email: string;
  address: string;
  status: 'Active' | 'Disabled' | 'Old Version';
  version?: string;
  areaTags: string[];
  avatar?: string;
  position?: string;
  department?: string;
  hireDate?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
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
    areaTags: ['Security', 'Night Shift'],
    position: 'Security Guard',
    department: 'Security',
    hireDate: '2023-01-15',
    emergencyContact: {
      name: 'John Doe',
      phone: '+1 (626) 555-0123',
      relationship: 'Spouse'
    }
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
    areaTags: ['Reception', 'Day Shift'],
    position: 'Receptionist',
    department: 'Administration',
    hireDate: '2022-03-10',
    emergencyContact: {
      name: 'Maria Dick',
      phone: '+1 (562) 555-0456',
      relationship: 'Mother'
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
    areaTags: ['Maintenance', 'Day Shift'],
    position: 'Maintenance Technician',
    department: 'Facilities',
    hireDate: '2023-06-20',
    emergencyContact: {
      name: 'Sarah G8',
      phone: '+1 (818) 555-0789',
      relationship: 'Sister'
    }
  },
  {
    id: '4',
    name: 'Richard Ibarrazaar',
    initials: 'RI',
    phone: '+1 (747) 724-4789',
    email: 'richard.ibarrazaar@email.com',
    address: '789 Pine St, Glendale, CA',
    status: 'Disabled',
    areaTags: ['Security', 'Night Shift'],
    position: 'Senior Security Guard',
    department: 'Security',
    hireDate: '2021-11-05',
    emergencyContact: {
      name: 'Lisa Ibarrazaar',
      phone: '+1 (747) 555-0321',
      relationship: 'Wife'
    }
  },
  {
    id: '5',
    name: 'Richardo Yumul',
    initials: 'RY',
    phone: '+1 (714) 721-9574',
    email: 'richardo.yumul@email.com',
    address: '321 Elm Dr, Orange, CA',
    status: 'Disabled',
    areaTags: ['Administration', 'Day Shift'],
    position: 'Administrative Assistant',
    department: 'Administration',
    hireDate: '2022-08-12',
    emergencyContact: {
      name: 'Carlos Yumul',
      phone: '+1 (714) 555-0654',
      relationship: 'Brother'
    }
  },
  {
    id: '6',
    name: 'Romeo Lacuesta',
    initials: 'RL',
    phone: '+1 (818) 293-6723',
    email: 'romeo.lacuesta@email.com',
    address: '654 Maple Ln, Van Nuys, CA',
    status: 'Active',
    areaTags: ['Cleaning', 'Night Shift'],
    position: 'Janitor',
    department: 'Facilities',
    hireDate: '2023-02-28',
    emergencyContact: {
      name: 'Anna Lacuesta',
      phone: '+1 (818) 555-0987',
      relationship: 'Mother'
    }
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
    areaTags: ['Security', 'Day Shift'],
    position: 'Security Guard',
    department: 'Security',
    hireDate: '2021-09-15',
    emergencyContact: {
      name: 'Priya Guard',
      phone: '+1 (213) 555-0147',
      relationship: 'Wife'
    }
  },
  {
    id: '8',
    name: 'Sally Sms',
    initials: 'SS',
    phone: '+1 (555) 123-4567',
    email: 'sally.sms@email.com',
    address: '147 Birch St, Pasadena, CA',
    status: 'Active',
    areaTags: ['Customer Service', 'Day Shift'],
    position: 'Customer Service Representative',
    department: 'Customer Service',
    hireDate: '2023-04-10',
    emergencyContact: {
      name: 'Tom Sms',
      phone: '+1 (555) 555-0258',
      relationship: 'Husband'
    }
  }
];

// Function to get staff member by ID
export const getStaffById = (id: string): StaffMember | undefined => {
  return staffData.find(staff => staff.id === id);
};

// Function to get staff by status
export const getStaffByStatus = (status: StaffMember['status']): StaffMember[] => {
  return staffData.filter(staff => staff.status === status);
};

// Function to search staff by name
export const searchStaffByName = (searchTerm: string): StaffMember[] => {
  return staffData.filter(staff => 
    staff.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
};
