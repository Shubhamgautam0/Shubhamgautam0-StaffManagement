// Central data manager for staff-site relationships
import { staffData, type StaffMember, getStaffById, updateStaffShifts } from './staffData';
import { SiteData, type Shift, type SiteMember, getShiftsForSiteAndDate, getStaffDetailsForShift } from './siteData';

export interface StaffShiftInfo {
  staffId: string;
  staffName: string;
  staffInitials: string;
  staffColor: string;
  siteId: string;
  siteName: string;
  date: string;
  startTime: string;
  endTime: string;
  shiftId: string;
}

export interface SiteStaffInfo {
  siteId: string;
  siteName: string;
  date: string;
  staffList: Array<{
    staffId: string;
    staffName: string;
    staffInitials: string;
    staffColor: string;
    shiftId: string;
    startTime: string;
    endTime: string;
  }>;
}

// Get all shifts for a specific staff member
export const getStaffShifts = (staffId: string, dateRange?: { start: Date; end: Date }): StaffShiftInfo[] => {
  const shifts: StaffShiftInfo[] = [];
  const staff = getStaffById(staffId);

  if (!staff) return shifts;

  SiteData.forEach(site => {
    if (site.shifts) {
      Object.entries(site.shifts).forEach(([date, siteShifts]) => {
        // Filter by date range if provided
        if (dateRange) {
          const shiftDate = new Date(date);
          if (shiftDate < dateRange.start || shiftDate > dateRange.end) {
            return;
          }
        }

        siteShifts.forEach(shift => {
          if (shift.assignedStaff.includes(staffId)) {
            shifts.push({
              staffId: staff.id,
              staffName: staff.name,
              staffInitials: staff.initials,
              staffColor: staff.color || '#2196F3',
              siteId: site.id,
              siteName: site.name,
              date: shift.date,
              startTime: shift.startTime,
              endTime: shift.endTime,
              shiftId: shift.id
            });
          }
        });
      });
    }
  });
  return shifts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Get all staff assigned to a specific site
export const getSiteStaff = (siteId: string, dateRange?: { start: Date; end: Date }): SiteStaffInfo[] => {
  const siteStaffInfo: SiteStaffInfo[] = [];
  const site = SiteData.find(s => s.id === siteId);
  
  if (!site || !site.shifts) return siteStaffInfo;
  
  Object.entries(site.shifts).forEach(([date, shifts]) => {
    // Filter by date range if provided
    if (dateRange) {
      const shiftDate = new Date(date);
      if (dateRange && (shiftDate < dateRange.start || shiftDate > dateRange.end)) {
        return;
      }
    }
    
    const staffList: SiteStaffInfo['staffList'] = [];
    
    shifts.forEach(shift => {
      shift.assignedStaff.forEach(staffId => {
        const staff = getStaffById(staffId);
        if (staff) {
          staffList.push({
            staffId: staff.id,
            staffName: staff.name,
            staffInitials: staff.initials,
            staffColor: staff.color || '#2196F3',
            shiftId: shift.id,
            startTime: shift.startTime,
            endTime: shift.endTime
          });
        }
      });
    });
    
    if (staffList.length > 0) {
      siteStaffInfo.push({
        siteId: site.id,
        siteName: site.name,
        date,
        staffList
      });
    }
  });
  
  return siteStaffInfo.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Get unassigned shifts (shifts without staff)
export const getUnassignedShifts = (dateRange?: { start: Date; end: Date }): Array<Shift & { siteName: string; siteId: string }> => {
  const unassignedShifts: Array<Shift & { siteName: string; siteId: string }> = [];
  
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
          if (!shift.assignedStaff || shift.assignedStaff.length === 0 || shift.staffRequired > shift.assignedStaff.length) {
            unassignedShifts.push({
              ...shift,
              siteName: site.name,
              siteId: site.id
            });
          }
        });
      });
    }
  });
  
  return unassignedShifts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

// Assign staff to a shift
export const assignStaffToShift = (siteId: string, shiftId: string, staffId: string): boolean => {
  const siteIndex = SiteData.findIndex(site => site.id === siteId);
  if (siteIndex === -1) return false;
  
  const site = SiteData[siteIndex];
  if (!site.shifts) return false;
  
  // Find the shift
  let shiftFound = false;
  Object.entries(site.shifts).forEach(([date, shifts]) => {
    const shiftIndex = shifts.findIndex(shift => shift.id === shiftId);
    if (shiftIndex !== -1) {
      const shift = shifts[shiftIndex];
      
      // Add staff to shift if not already assigned
      if (!shift.assignedStaff.includes(staffId)) {
        const staff = getStaffById(staffId);
        if (staff) {
          shift.assignedStaff.push(staffId);
          shift.assignedStaffNames.push(staff.name);
          shift.assignedStaffInitials.push(staff.initials);
          
          // Update staff's current shifts
          const currentShifts = getStaffShifts(staffId);
          updateStaffShifts(staffId, currentShifts.map(s => ({
            siteId: s.siteId,
            siteName: s.siteName,
            date: s.date,
            startTime: s.startTime,
            endTime: s.endTime,
            shiftId: s.shiftId
          })));
          
          shiftFound = true;
        }
      }
    }
  });
  
  return shiftFound;
};

// Remove staff from a shift
export const removeStaffFromShift = (siteId: string, shiftId: string, staffId: string): boolean => {
  const siteIndex = SiteData.findIndex(site => site.id === siteId);
  if (siteIndex === -1) return false;
  
  const site = SiteData[siteIndex];
  if (!site.shifts) return false;
  
  // Find the shift
  let shiftFound = false;
  Object.entries(site.shifts).forEach(([date, shifts]) => {
    const shiftIndex = shifts.findIndex(shift => shift.id === shiftId);
    if (shiftIndex !== -1) {
      const shift = shifts[shiftIndex];
      
      // Remove staff from shift
      const staffIndex = shift.assignedStaff.indexOf(staffId);
      if (staffIndex !== -1) {
        shift.assignedStaff.splice(staffIndex, 1);
        shift.assignedStaffNames.splice(staffIndex, 1);
        shift.assignedStaffInitials.splice(staffIndex, 1);
        
        // Update staff's current shifts
        const currentShifts = getStaffShifts(staffId);
        updateStaffShifts(staffId, currentShifts.map(s => ({
          siteId: s.siteId,
          siteName: s.siteName,
          date: s.date,
          startTime: s.startTime,
          endTime: s.endTime,
          shiftId: s.shiftId
        })));
        
        shiftFound = true;
      }
    }
  });
  
  return shiftFound;
};

// Get staff availability for a specific date
export const getStaffAvailability = (date: string): Array<{ staff: StaffMember; isAvailable: boolean; currentShift?: StaffShiftInfo }> => {
  const availability: Array<{ staff: StaffMember; isAvailable: boolean; currentShift?: StaffShiftInfo }> = [];
  
  staffData.forEach(staff => {
    if (staff.status === 'Active') {
      const staffShifts = getStaffShifts(staff.id, { 
        start: new Date(date), 
        end: new Date(date) 
      });
      
      const currentShift = staffShifts.find(shift => shift.date === date);
      
      availability.push({
        staff,
        isAvailable: !currentShift,
        currentShift
      });
    }
  });
  
  return availability;
};

// Get site occupancy for a specific date
export const getSiteOccupancy = (date: string): Array<{ site: SiteMember; shifts: Array<Shift & { staffDetails: StaffMember[] }> }> => {
  const occupancy: Array<{ site: SiteMember; shifts: Array<Shift & { staffDetails: StaffMember[] }> }> = [];
  
  SiteData.forEach(site => {
    if (site.shifts && site.shifts[date]) {
      const shiftsWithStaff = site.shifts[date].map(shift => ({
        ...shift,
        staffDetails: getStaffDetailsForShift(shift)
      }));
      
      occupancy.push({
        site,
        shifts: shiftsWithStaff
      });
    }
  });
  
  return occupancy;
};
