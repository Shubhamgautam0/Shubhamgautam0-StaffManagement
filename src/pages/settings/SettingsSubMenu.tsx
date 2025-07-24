import React from 'react';
import { Box, List, ListItem, ListItemText } from '@mui/material';

interface SettingsSubMenuProps {
  selectedCategory: string;
  selectedSubItem: string;
  onSubItemSelect: (subItem: string) => void;
}

const SettingsSubMenu: React.FC<SettingsSubMenuProps> = ({
  selectedCategory,
  selectedSubItem,
  onSubItemSelect
}) => {
  const getSubMenuItems = (category: string) => {
    switch (category) {
      case 'timesheet':
        return [
          { id: 'work-week', label: 'Work Week' },
          { id: 'time-format', label: 'Time Format' },
          { id: 'overtime-rule', label: 'Overtime Rule' },
          { id: 'day-night-time-rule', label: 'Day/Night Time Rule' },
          { id: 'breaks', label: 'Breaks' },
          { id: 'payroll-time', label: 'Payroll Time' },
          { id: 'weekend-time-rule', label: 'Weekend Time Rule' },
          { id: 'holiday-hrs', label: 'Holiday Hrs' }
        ];
      case 'notifications':
        return [
          { id: 'notify-manager', label: 'Notify Manager' },
          { id: 'notify-staff', label: 'Notify Staff' },
        ];
      case 'shift-settings':
        return [
          { id: 'Start Duty', label: 'Start Duty' },
          { id: 'Shift Settings', label: 'Shift Settings' },
          { id: 'Edit Shift', label: 'Edit Shift' },
          { id: 'Shift Report', label: 'Shift Report' }
        ];
      case 'staff':
        return [
          { id: 'Shift Reminders', label: 'Shift Reminders' },
          { id: 'Shift Confirmation', label: 'Shift Confirmation' },
          { id: 'Staff Name Format', label: 'Staff Name Format' },
          { id: 'Custom Field', label: 'Custom Field' },
          { id: 'License Reminders', label: 'License Reminders' },
          { id: 'Attachments', label: 'Attachments' }
        ];
      case 'visitor-management':
        return [
          { id: 'visitor-settings', label: 'Visitor Settings' },
        ];
      case 'site':
        return [
          { id: 'Site Setting', label: 'Site Setting' },
          { id: 'Custom Field', label: 'Custom Field' },
        ];
      case 'customers':
        return [
          { id: 'customer-list', label: 'Customer List' },
        ];
      case 'rates':
        return [
          { id: 'pay-rates', label: 'Pay Rates' },
          { id: 'bill-rates', label: 'Bill Rates' },
        ];
      case 'invoice-estimate':
        return [
          { id: 'General', label: 'General' },
          { id: 'Invoice', label: 'Invoice' },
          { id: 'Estimate', label: 'Estimate' },
          { id: 'Products ', label: 'Products ' },
          { id: 'Sales Taxes', label: 'Sales Taxes' }
        ];
      default:
        return [];
    }
  };

  const subMenuItems = getSubMenuItems(selectedCategory);

  return (
    <Box className="settings-submenu-content">
      <List className="settings-submenu-list">
        {subMenuItems.map((item) => (
          <ListItem
            key={item.id}
            className={`settings-submenu-item ${
              selectedSubItem === item.id ? 'selected' : ''
            }`}
            onClick={() => onSubItemSelect(item.id)}
          >
            <ListItemText 
              primary={item.label}
              className="settings-submenu-text"
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SettingsSubMenu;
