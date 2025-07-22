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
          { id: 'email-notifications', label: 'Email Notifications' },
          { id: 'push-notifications', label: 'Push Notifications' },
          { id: 'sms-notifications', label: 'SMS Notifications' }
        ];
      case 'shift-settings':
        return [
          { id: 'shift-templates', label: 'Shift Templates' },
          { id: 'shift-rules', label: 'Shift Rules' },
          { id: 'auto-scheduling', label: 'Auto Scheduling' }
        ];
      case 'staff':
        return [
          { id: 'staff-roles', label: 'Staff Roles' },
          { id: 'permissions', label: 'Permissions' },
          { id: 'staff-groups', label: 'Staff Groups' }
        ];
      case 'visitor-management':
        return [
          { id: 'visitor-settings', label: 'Visitor Settings' },
          { id: 'visitor-types', label: 'Visitor Types' },
          { id: 'check-in-process', label: 'Check-in Process' }
        ];
      case 'site':
        return [
          { id: 'site-settings', label: 'Site Settings' },
          { id: 'geofencing', label: 'Geofencing' },
          { id: 'site-templates', label: 'Site Templates' }
        ];
      case 'customers':
        return [
          { id: 'customer-list', label: 'Customer List' },
          { id: 'customer-groups', label: 'Customer Groups' },
          { id: 'billing-settings', label: 'Billing Settings' }
        ];
      case 'rates':
        return [
          { id: 'pay-rates', label: 'Pay Rates' },
          { id: 'bill-rates', label: 'Bill Rates' },
          { id: 'overtime-rates', label: 'Overtime Rates' }
        ];
      case 'invoice-estimate':
        return [
          { id: 'invoice-settings', label: 'Invoice Settings' },
          { id: 'estimate-templates', label: 'Estimate Templates' },
          { id: 'payment-terms', label: 'Payment Terms' }
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
