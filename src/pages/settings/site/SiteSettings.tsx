import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  FormControlLabel,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface SiteSettingsProps {
  selectedSubItem: string;
}

interface CustomContact {
  id: string;
  name: string;
  phone: string;
  checked: boolean;
}

const SiteSettings: React.FC<SiteSettingsProps> = ({ selectedSubItem }) => {
  const [allowStaffViewContact, setAllowStaffViewContact] = useState(true);
  const [assignedManagers, setAssignedManagers] = useState(true);
  const [previousStaff, setPreviousStaff] = useState(true);
  const [nextStaff, setNextStaff] = useState(true);
  const [currentStaff, setCurrentStaff] = useState(true);

  const [customContacts, setCustomContacts] = useState<CustomContact[]>([
    { id: '1', name: 'Mimi | Operations Manager', phone: '818-720-2855', checked: true }
  ]);

  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  const [panicContacts, setPanicContacts] = useState<CustomContact[]>([
    { id: '1', name: 'Mimi | Operations Manager', phone: '818-720-2855', checked: true },
    { id: '2', name: 'Ehab | Dispatcher', phone: '818-964-1119', checked: true },
    { id: '3', name: 'call police', phone: '911', checked: true }
  ]);

  const [newPanicName, setNewPanicName] = useState('');
  const [newPanicPhone, setNewPanicPhone] = useState('');

  const addCustomContact = () => {
    if (newContactName.trim() && newContactPhone.trim()) {
      const newContact: CustomContact = {
        id: Date.now().toString(),
        name: newContactName,
        phone: newContactPhone,
        checked: false
      };
      setCustomContacts([...customContacts, newContact]);
      setNewContactName('');
      setNewContactPhone('');
    }
  };

  const removeCustomContact = (id: string) => {
    setCustomContacts(customContacts.filter(contact => contact.id !== id));
  };

  const updateCustomContact = (id: string, field: 'checked' | 'name' | 'phone', value: boolean | string) => {
    setCustomContacts(customContacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const addPanicContact = () => {
    if (newPanicName.trim() && newPanicPhone.trim()) {
      const newContact: CustomContact = {
        id: Date.now().toString(),
        name: newPanicName,
        phone: newPanicPhone,
        checked: false
      };
      setPanicContacts([...panicContacts, newContact]);
      setNewPanicName('');
      setNewPanicPhone('');
    }
  };

  const removePanicContact = (id: string) => {
    setPanicContacts(panicContacts.filter(contact => contact.id !== id));
  };

  const updatePanicContact = (id: string, field: 'checked' | 'name' | 'phone', value: boolean | string) => {
    setPanicContacts(panicContacts.map(contact => 
      contact.id === id ? { ...contact, [field]: value } : contact
    ));
  };

  const renderSiteSetting = () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Site - Point of Contact
      </Typography>

      <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
        The selected contact information will be shown by default to the staff member during the shift. You can change contact for individual site by choosing custom in particular site settings.
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" sx={{ mb: 2, fontWeight: 500 }}>
          Allow Staff to view contact details:
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
          *Minimum 1 should be selected
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Existing Contact
        </Typography>
        
        <Box sx={{ ml: 2 }}>
          <FormControlLabel
            control={
              <Checkbox 
                checked={assignedManagers}
                onChange={(e) => setAssignedManagers(e.target.checked)}
              />
            }
            label="Assigned Managers"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={previousStaff}
                onChange={(e) => setPreviousStaff(e.target.checked)}
              />
            }
            label="Previous Staff on Shift"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={nextStaff}
                onChange={(e) => setNextStaff(e.target.checked)}
              />
            }
            label="Next Staff on Shift"
            sx={{ display: 'block', mb: 1 }}
          />
          <FormControlLabel
            control={
              <Checkbox 
                checked={currentStaff}
                onChange={(e) => setCurrentStaff(e.target.checked)}
              />
            }
            label="Current Staff on Shift"
            sx={{ display: 'block', mb: 1 }}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
          Custom Contacts
        </Typography>
        
        {customContacts.map((contact) => (
          <Box key={contact.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Checkbox
              checked={contact.checked}
              onChange={(e) => updateCustomContact(contact.id, 'checked', e.target.checked)}
            />
            <Typography sx={{ flex: 1, mr: 2 }}>
              {contact.name}
            </Typography>
            <Typography sx={{ mr: 2, color: 'text.secondary' }}>
              {contact.phone}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => removeCustomContact(contact.id)}
              sx={{ color: 'error.main' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Checkbox />
          <TextField
            placeholder="Name*"
            value={newContactName}
            onChange={(e) => setNewContactName(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            placeholder="Phone no*"
            value={newContactPhone}
            onChange={(e) => setNewContactPhone(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <IconButton 
            size="small" 
            onClick={() => {
              setNewContactName('');
              setNewContactPhone('');
            }}
            sx={{ color: 'error.main' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <IconButton 
          onClick={addCustomContact}
          sx={{ 
            mt: 2,
            border: '1px dashed #ccc',
            borderRadius: 1,
            p: 1
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Site - Panic Button Contact
        </Typography>
        <Typography variant="body2" sx={{ mb: 3, color: 'text.secondary' }}>
          The selected contact information will be shown by default to the staff member during the shift. You can change contact for individual site by choosing custom in particular site settings.
        </Typography>
        
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', display: 'block', mb: 1 }}>
          *Minimum 1 should be selected
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary', fontStyle: 'italic', display: 'block', mb: 3 }}>
          *Maximum 3 can be selected
        </Typography>

        {panicContacts.map((contact) => (
          <Box key={contact.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Checkbox
              checked={contact.checked}
              onChange={(e) => updatePanicContact(contact.id, 'checked', e.target.checked)}
            />
            <Typography sx={{ flex: 1, mr: 2 }}>
              {contact.name}
            </Typography>
            <Typography sx={{ mr: 2, color: 'text.secondary' }}>
              {contact.phone}
            </Typography>
            <IconButton 
              size="small" 
              onClick={() => removePanicContact(contact.id)}
              sx={{ color: 'error.main' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        ))}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
          <Checkbox />
          <TextField
            placeholder="Name*"
            value={newPanicName}
            onChange={(e) => setNewPanicName(e.target.value)}
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            placeholder="Phone no*"
            value={newPanicPhone}
            onChange={(e) => setNewPanicPhone(e.target.value)}
            size="small"
            sx={{ width: 150 }}
          />
          <IconButton 
            size="small" 
            onClick={() => {
              setNewPanicName('');
              setNewPanicPhone('');
            }}
            sx={{ color: 'error.main' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <IconButton 
          onClick={addPanicContact}
          sx={{ 
            mt: 2,
            border: '1px dashed #ccc',
            borderRadius: 1,
            p: 1
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      <Button 
        variant="contained" 
        sx={{ 
          backgroundColor: '#5c6bc0',
          '&:hover': {
            backgroundColor: '#3f51b5'
          },
          px: 4,
          py: 1.5
        }}
      >
        SAVE
      </Button>
    </Box>
  );

  const renderContent = () => {
    switch (selectedSubItem) {
      case 'Site Setting':
        return renderSiteSetting();
      default:
        return renderSiteSetting();
    }
  };

  return (
    <Box>
      {renderContent()}
    </Box>
  );
};

export default SiteSettings;
