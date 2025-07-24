export interface Request {
  id: string;
  title: string;
  description: string;
  type: 'leave' | 'shift_change' | 'overtime' | 'other';
  status: 'pending' | 'completed' | 'cancelled' | 'rejected';
  requestedBy: string;
  requestedById: string;
  requestedDate: string;
  responseDate?: string;
  respondedBy?: string;
  responseMessage?: string;
  priority: 'low' | 'medium' | 'high';
  attachments?: string[];
}

export const requestData: Request[] = [
  {
    id: 'req-001',
    title: 'Annual Leave Request',
    description: 'Requesting 5 days of annual leave for vacation',
    type: 'leave',
    status: 'pending',
    requestedBy: 'John Smith',
    requestedById: 'staff-001',
    requestedDate: '2024-01-15',
    priority: 'medium',
  },
  {
    id: 'req-002',
    title: 'Shift Change Request',
    description: 'Request to change shift from morning to evening',
    type: 'shift_change',
    status: 'completed',
    requestedBy: 'Sarah Johnson',
    requestedById: 'staff-002',
    requestedDate: '2024-01-10',
    responseDate: '2024-01-12',
    respondedBy: 'Manager',
    responseMessage: 'Approved. Shift change effective from next week.',
    priority: 'low',
  },
  {
    id: 'req-003',
    title: 'Overtime Request',
    description: 'Request for overtime hours due to project deadline',
    type: 'overtime',
    status: 'rejected',
    requestedBy: 'Mike Davis',
    requestedById: 'staff-003',
    requestedDate: '2024-01-08',
    responseDate: '2024-01-09',
    respondedBy: 'Manager',
    responseMessage: 'Overtime not approved due to budget constraints.',
    priority: 'high',
  },
];

export const getRequestsByStatus = (status: string): Request[] => {
  if (status === 'cancelled/rejected') {
    return requestData.filter(req => req.status === 'cancelled' || req.status === 'rejected');
  }
  return requestData.filter(req => req.status === status);
};

export const getAllRequests = (): Request[] => {
  return requestData;
};

export const addRequest = (request: Omit<Request, 'id'>): Request => {
  const newRequest: Request = {
    ...request,
    id: `req-${Date.now()}`,
  };
  requestData.push(newRequest);
  return newRequest;
};

export const updateRequestStatus = (
  requestId: string, 
  status: Request['status'], 
  responseMessage?: string,
  respondedBy?: string
): Request | null => {
  const requestIndex = requestData.findIndex(req => req.id === requestId);
  if (requestIndex !== -1) {
    requestData[requestIndex] = {
      ...requestData[requestIndex],
      status,
      responseDate: new Date().toISOString().split('T')[0],
      responseMessage,
      respondedBy,
    };
    return requestData[requestIndex];
  }
  return null;
};
