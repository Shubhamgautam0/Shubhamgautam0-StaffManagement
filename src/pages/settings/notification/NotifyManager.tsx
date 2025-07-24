import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  TextField
} from '@mui/material';
import { defaultNotifyManagerSettings, type NotifyManagerSettings, type NotificationRule } from '../../../data/notificationSettingsData';

const NotifyManager: React.FC = () => {
  const [settings, setSettings] = useState<NotifyManagerSettings>(defaultNotifyManagerSettings);

  const handleStartDutyMissedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      startDutyMissed: {
        ...settings.startDutyMissed,
        enabled: event.target.checked
      }
    });
  };

  const handleEmailRuleChange = (id: string, field: keyof NotificationRule, value: any) => {
    setSettings({
      ...settings,
      emailRules: settings.emailRules.map(rule =>
        rule.id === id ? { ...rule, [field]: value } : rule
      )
    });
  };

  const handleStaffEndedShiftChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      staffEndedShiftAlert: {
        ...settings.staffEndedShiftAlert,
        enabled: event.target.checked
      }
    });
  };

  const handleStaffRequestChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({
      ...settings,
      staffRequestAlert: {
        ...settings.staffRequestAlert,
        enabled: event.target.checked
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Notify Manager
      </Typography>

      {/* Start Duty Missed Section */}
      <Box sx={{ mb: 4 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.startDutyMissed.enabled}
              onChange={handleStartDutyMissedChange}
            />
          }
          label={settings.startDutyMissed.description}
          sx={{ mb: 2 }}
        />

        {/* Email Rules */}
        {settings.emailRules.map((rule, index) => (
          <Box key={rule.id} sx={{ ml: 4, mb: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Checkbox
              checked={rule.enabled}
              onChange={(e) => handleEmailRuleChange(rule.id, 'enabled', e.target.checked)}
              size="small"
            />
            <Typography variant="body2" sx={{ minWidth: 'fit-content' }}>
              {rule.description}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={rule.timeValue}
                onChange={(e) => handleEmailRuleChange(rule.id, 'timeValue', Number(e.target.value))}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={30}>30</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={rule.timeUnit}
                onChange={(e) => handleEmailRuleChange(rule.id, 'timeUnit', e.target.value)}
              >
                <MenuItem value="Mins">Mins</MenuItem>
                <MenuItem value="Hours">Hours</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ minWidth: 'fit-content' }}>
              {rule.timing}
            </Typography>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <Select
                value={rule.emailType}
                onChange={(e) => handleEmailRuleChange(rule.id, 'emailType', e.target.value)}
              >
                <MenuItem value="Other Email">Other Email</MenuItem>
                <MenuItem value="Manager Email">Manager Email</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
              {rule.emailType === 'Other Email' ? 'Specify a separate email' : 'Warning: a separate email'}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Staff Ended Shift Alert */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.staffEndedShiftAlert.enabled}
              onChange={handleStaffEndedShiftChange}
            />
          }
          label={settings.staffEndedShiftAlert.description}
        />
      </Box>

      {/* Staff Request Alert */}
      <Box sx={{ mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={settings.staffRequestAlert.enabled}
              onChange={handleStaffRequestChange}
            />
          }
          label={settings.staffRequestAlert.description}
        />
      </Box>
    </Box>
  );
};

export default NotifyManager;
