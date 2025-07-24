import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface StaffSettingsProps {
  selectedSubItem: string;
}

const StaffSettings: React.FC<StaffSettingsProps> = ({ selectedSubItem }) => {
  // Shift Reminders state
  const [sendEmailReminder, setSendEmailReminder] = useState(true);
  const [sendPushReminder, setSendPushReminder] = useState(true);
  const [shiftAddedEdited, setShiftAddedEdited] = useState(false);
  const [twoHrsBefore, setTwoHrsBefore] = useState(false);
  const [oneHrBefore, setOneHrBefore] = useState(false);
  const [sixHrsBefore, setSixHrsBefore] = useState(false);

  const [confirmationOption, setConfirmationOption] = useState('accept-decline');

  const [nameFormat, setNameFormat] = useState('firstname-lastname');

  const [enableReminders, setEnableReminders] = useState(false);
  const [consolidatedSummary, setConsolidatedSummary] = useState(false);
  const [individualReminders, setIndividualReminders] = useState(false);

  const [attachments, setAttachments] = useState(true);
  const [realTimePhoto, setRealTimePhoto] = useState(true);

  const renderShiftReminders = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Shift Reminders
      </Typography>

      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={sendEmailReminder}
              onChange={(e) => setSendEmailReminder(e.target.checked)}
            />
          }
          label="Send Email Reminder"
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={sendPushReminder}
              onChange={(e) => setSendPushReminder(e.target.checked)}
            />
          }
          label="Send Push Reminder"
        />
      </Box>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Staff will be send Shift reminders, Push Notifications during the following time
      </Typography>

      <Box sx={{ ml: 2 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={shiftAddedEdited}
              onChange={(e) => setShiftAddedEdited(e.target.checked)}
            />
          }
          label="When Shift Added or Edited"
          sx={{ display: 'block', mb: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={twoHrsBefore}
              onChange={(e) => setTwoHrsBefore(e.target.checked)}
            />
          }
          label="2 Hrs before Shift Time"
          sx={{ display: 'block', mb: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={oneHrBefore}
              onChange={(e) => setOneHrBefore(e.target.checked)}
            />
          }
          label="1 Hr before Shift Time"
          sx={{ display: 'block', mb: 1 }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={sixHrsBefore}
              onChange={(e) => setSixHrsBefore(e.target.checked)}
            />
          }
          label="6 Hr before Shift Time"
          sx={{ display: 'block', mb: 1 }}
        />
      </Box>
    </Box>
  );

  const renderShiftConfirmation = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Staff Shift Confirmation option
      </Typography>

      <RadioGroup
        value={confirmationOption}
        onChange={(e) => setConfirmationOption(e.target.value)}
      >
        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            value="accept-decline"
            control={<Radio />}
            label="Accept and Decline Button"
          />
          <Typography variant="body2" sx={{ ml: 4, color: 'text.secondary' }}>
            Staff will have to either Accept or Decline Shift in the StaffApp. Upon Accept,managers will receive confirmation notification. Upon Decline, a request will be generated for managers to approve
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            value="accept-only"
            control={<Radio />}
            label="Accept Button Only"
          />
          <Typography variant="body2" sx={{ ml: 4, color: 'text.secondary' }}>
            Staff will only have option to Accept and upon Accept,managers receive confirmation notification. Manager also receives an Alert if Staff does not Accept 2 hrs. before the Shift Start Time
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <FormControlLabel
            value="no-confirmation"
            control={<Radio />}
            label="No Confirmation"
          />
          <Typography variant="body2" sx={{ ml: 4, color: 'text.secondary' }}>
            Staff will NOT have option to Accept or Decline. The Shifts will be considered Pre-Approved
          </Typography>
        </Box>
      </RadioGroup>
    </Box>
  );

  const renderStaffNameFormat = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Staff Name Format
      </Typography>

      <RadioGroup
        value={nameFormat}
        onChange={(e) => setNameFormat(e.target.value)}
      >
        <FormControlLabel
          value="firstname-lastname"
          control={<Radio />}
          label="FirstName LastName"
          sx={{ mb: 1 }}
        />
        <FormControlLabel
          value="lastname-firstname"
          control={<Radio />}
          label="LastName FirstName"
          sx={{ mb: 1 }}
        />
      </RadioGroup>
    </Box>
  );

  const renderCustomField = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Staff - Custom Field
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Add custom fields to the Staff
        </Typography>
        <IconButton 
          sx={{ 
            border: '1px dashed #ccc',
            borderRadius: 1,
            p: 1
          }}
        >
          <AddIcon />
        </IconButton>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            backgroundColor: '#5c6bc0',
            '&:hover': {
              backgroundColor: '#3f51b5'
            }
          }}
        >
          ADD CUSTOM FIELD
        </Button>
      </Box>
    </Box>
  );

  const renderLicenseReminders = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        License Reminders
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={enableReminders}
            onChange={(e) => setEnableReminders(e.target.checked)}
          />
        }
        label="Enable Reminders"
        sx={{ display: 'block', mb: 2 }}
      />

      <Box sx={{ ml: 4 }}>
        <FormControlLabel
          control={
            <Checkbox 
              checked={consolidatedSummary}
              onChange={(e) => setConsolidatedSummary(e.target.checked)}
            />
          }
          label="Send consolidated monthly summary of licenses expiry for all staff"
          sx={{ display: 'block', mb: 1, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        />
        <FormControlLabel
          control={
            <Checkbox 
              checked={individualReminders}
              onChange={(e) => setIndividualReminders(e.target.checked)}
            />
          }
          label="Send individual reminders for each staff before 30, 60 and 90 days of license expiry"
          sx={{ display: 'block', mb: 1, '& .MuiFormControlLabel-label': { color: 'text.secondary' } }}
        />
      </Box>
    </Box>
  );

  const renderAttachments = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Staff-Attachment
      </Typography>

      <FormControlLabel
        control={
          <Checkbox 
            checked={attachments}
            onChange={(e) => setAttachments(e.target.checked)}
          />
        }
        label="Attachments"
        sx={{ display: 'block', mb: 2 }}
      />

      <FormControlLabel
        control={
          <Checkbox 
            checked={realTimePhoto}
            onChange={(e) => setRealTimePhoto(e.target.checked)}
          />
        }
        label="Real time photo"
        sx={{ display: 'block', mb: 2 }}
      />
    </Box>
  );

  const renderContent = () => {
    switch (selectedSubItem) {
      case 'Shift Reminders':
        return renderShiftReminders();
      case 'Shift Confirmation':
        return renderShiftConfirmation();
      case 'Staff Name Format':
        return renderStaffNameFormat();
      case 'Custom Field':
        return renderCustomField();
      case 'License Reminders':
        return renderLicenseReminders();
      case 'Attachments':
        return renderAttachments();
      default:
        return renderShiftReminders();
    }
  };

  return (
    <Box>
      {renderContent()}
    </Box>
  );
};

export default StaffSettings;
