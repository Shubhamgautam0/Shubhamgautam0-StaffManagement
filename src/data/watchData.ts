export interface WatchSite {
  id: string;
  name: string;
  address: string;
  status: 'online' | 'offline' | 'alert';
  lastUpdate: string;
  staffName: string;
  staffInitials: string;
  color: string;
  description: string;
  shiftTime: string;
  contactNumber: string;
  emergencyContact: string;
  lastActivity: string;
  totalCameras: number;
  activeCameras: number;
  alerts: number;
  incidents: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface UrgentLog {
  id: string;
  siteId: string;
  staffName: string;
  staffInitials: string;
  duty: string;
  time: string;
  type: 'started' | 'alert' | 'incident' | 'completed' | 'late';
  description: string;
  timestamp: string;
  isLate?: boolean;
  lateBy?: string;
}

export const watchSitesData: WatchSite[] = [
  {
    id: '1',
    name: 'OLD REGAL CINEMA SITE',
    address: '2369 W Florida Ave, Hemet, CA 92545, USA',
    status: 'online',
    lastUpdate: '08:00p - 08:00a',
    staffName: 'AmericanGuard M.',
    staffInitials: 'AM',
    color: '#ff6b35',
    description: 'Security monitoring for cinema complex with multiple entry points and parking areas.',
    shiftTime: '8:00 PM - 8:00 AM',
    contactNumber: '+1 (555) 123-4567',
    emergencyContact: '+1 (555) 987-6543',
    lastActivity: '2 minutes ago',
    totalCameras: 12,
    activeCameras: 11,
    alerts: 0,
    incidents: 2,
    coordinates: {
      lat: 33.7455,
      lng: -116.9711
    }
  },
  {
    id: '2',
    name: 'TRACTOR SUPPLY',
    address: '6710 Colony St, Bakersfield, CA, U...',
    status: 'offline',
    lastUpdate: '08:30p - 06:00a',
    staffName: '',
    staffInitials: 'TH',
    color: '#ff9800',
    description: 'Retail store security with warehouse monitoring and perimeter surveillance.',
    shiftTime: '8:30 PM - 6:00 AM',
    contactNumber: '+1 (555) 234-5678',
    emergencyContact: '+1 (555) 876-5432',
    lastActivity: '45 minutes ago',
    totalCameras: 8,
    activeCameras: 0,
    alerts: 1,
    incidents: 0,
    coordinates: {
      lat: 35.3733,
      lng: -119.0187
    }
  },
  {
    id: '3',
    name: 'ROOT VISION POST',
    address: '14644 Ventura Boulevard, Sherma...',
    status: 'online',
    lastUpdate: '09:00p - 06:00a',
    staffName: '',
    staffInitials: 'RV',
    color: '#8e6ec8',
    description: 'Commercial office building with 24/7 security monitoring and access control.',
    shiftTime: '9:00 PM - 6:00 AM',
    contactNumber: '+1 (555) 345-6789',
    emergencyContact: '+1 (555) 765-4321',
    lastActivity: '5 minutes ago',
    totalCameras: 16,
    activeCameras: 16,
    alerts: 0,
    incidents: 1,
    coordinates: {
      lat: 34.1522,
      lng: -118.4437
    }
  }
];

export const urgentLogsData: UrgentLog[] = [
  {
    id: '1',
    siteId: '1',
    staffName: 'AmericanGuard M.',
    staffInitials: 'AM',
    duty: 'Started Duty',
    time: '08:36p',
    type: 'late',
    description: '36 mins late',
    timestamp: '2025-07-18T20:36:00Z',
    isLate: true,
    lateBy: '36 mins'
  },
  {
    id: '2',
    siteId: '1',
    staffName: 'Security Team Alpha',
    staffInitials: 'ST',
    duty: 'Perimeter Check',
    time: '07:45p',
    type: 'completed',
    description: '26 h 15m ago',
    timestamp: '2025-07-17T19:45:00Z'
  },
  {
    id: '3',
    siteId: '2',
    staffName: 'Night Watch Beta',
    staffInitials: 'NW',
    duty: 'Camera Malfunction',
    time: '06:30p',
    type: 'alert',
    description: '27 h 30m ago',
    timestamp: '2025-07-17T18:30:00Z'
  },
  {
    id: '4',
    siteId: '3',
    staffName: 'Guard Delta',
    staffInitials: 'GD',
    duty: 'Access Control Check',
    time: '09:15p',
    type: 'completed',
    description: '23 h 45m ago',
    timestamp: '2025-07-17T21:15:00Z'
  },
  {
    id: '5',
    siteId: '1',
    staffName: 'Emergency Response',
    staffInitials: 'ER',
    duty: 'Incident Report',
    time: '05:20p',
    type: 'incident',
    description: '28 h 40m ago',
    timestamp: '2025-07-17T17:20:00Z'
  }
];

// Helper functions
export const getWatchSiteById = (id: string): WatchSite | undefined => {
  return watchSitesData.find(site => site.id === id);
};

export const getUrgentLogsBySiteId = (siteId: string): UrgentLog[] => {
  return urgentLogsData.filter(log => log.siteId === siteId);
};

export const getAllUrgentLogs = (): UrgentLog[] => {
  return urgentLogsData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'online': return '#4caf50';
    case 'offline': return '#f44336';
    case 'alert': return '#ff9800';
    default: return '#999';
  }
};

export const getLogTypeColor = (type: string): string => {
  switch (type) {
    case 'started': return '#4caf50';
    case 'alert': return '#ff9800';
    case 'incident': return '#f44336';
    case 'completed': return '#2196f3';
    case 'late': return '#ff5722';
    default: return '#999';
  }
};

export const getStatusText = (status: string): string => {
  switch (status) {
    case 'online': return 'Online';
    case 'offline': return 'Offline';
    case 'alert': return 'Alert';
    default: return 'Unknown';
  }
};
