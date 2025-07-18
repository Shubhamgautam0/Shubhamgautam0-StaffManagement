import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
  TextField,
  Chip,
  Switch,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
} from '@mui/material';
import {
  MoreVert,
  FiberManualRecord,
  Close,
  Add,
  AttachFile,
  Delete,
  AccessTime,
  Description,
} from '@mui/icons-material';
import CustomReportsList from '../../components/reports/CustomReportsList';
import CustomReportsDrawer from '../../components/reports/CustomReportsDialog';
import { type CustomReport, defaultReports } from '../../data/reportsData';
import { type SiteMember, SiteData } from '../../data/siteData';

interface SiteInstruction {
  id: string;
  text: string;
}

interface JobDuty {
  id: string;
  name: string;
  active: boolean;
  type: 'Static' | 'Mobile Patrol';
  durationType: string;
  timeLimit: string;
  checkInTime?: string;
  reportRequired: boolean;
  attachmentsRequired: boolean;
}

interface SiteInfoProps {
  selectedSiteId?: string;
  selectedSite?: SiteMember | null;
}

const SiteInfo: React.FC<SiteInfoProps> = ({ selectedSiteId, selectedSite }) => {
  const [sites, setSites] = useState<SiteMember[]>(SiteData);
  const [showInstructionForm, setShowInstructionForm] = useState(false);
  const [instructionText, setInstructionText] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const [siteInstructions, setSiteInstructions] = useState<SiteInstruction[]>([
    { id: Date.now().toString(), text: '' }
  ]);

  // Job Duties states
  const [showJobDutyForm, setShowJobDutyForm] = useState(false);
  const [jobDutyData, setJobDutyData] = useState<JobDuty>({
    id: '',
    name: '',
    active: true,
    type: 'Static',
    durationType: 'Regular Interval',
    timeLimit: '01 hrs 00 mins',
    checkInTime: 'Check in',
    reportRequired: false,
    attachmentsRequired: false,
  });
  const [jobDuties, setJobDuties] = useState<JobDuty[]>([]);

  // Custom Reports state
  const [customReports, setCustomReports] = useState<CustomReport[]>(defaultReports);
  const [showCustomReportsDialog, setShowCustomReportsDialog] = useState(false);

  // Get current site (prefer selectedSite prop, then selectedSiteId, then first site)
  const currentSite = selectedSite || sites.find(site => site.id === selectedSiteId) || sites[0];

  const handleAddInstruction = () => {
    setShowInstructionForm(true);
  };

  const handleSaveInstruction = () => {
    if (instructionText.trim()) {
      const newInstruction: SiteInstruction = {
        id: Date.now().toString(),
        text: instructionText.trim()
      };
      setSiteInstructions([...siteInstructions, newInstruction]);
      setInstructionText('');
      setAttachments([]);
      setShowInstructionForm(false);
    }
  };

  const handleCancelInstruction = () => {
    setInstructionText('');
    setAttachments([]);
    setShowInstructionForm(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    console.log(files);
    if (files) {
      const newFiles = Array.from(files);
      const totalFiles = attachments.length + newFiles.length;

      if (totalFiles <= 20) {
        setAttachments([...attachments, ...newFiles]);
      } else {
        alert('Maximum 20 files allowed');
      }
    }
  };

  const handleRemoveAttachment = (index: number) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(updatedAttachments);
  };

  // Job Duty handlers
  const handleAddJobDuty = () => {
    setShowJobDutyForm(true);
  };

  const handleSaveJobDuty = () => {
    if (jobDutyData.name.trim()) {
      const newJobDuty: JobDuty = {
        ...jobDutyData,
        id: Date.now().toString(),
        name: jobDutyData.name.trim()
      };
      setJobDuties([...jobDuties, newJobDuty]);
      setJobDutyData({
        id: '',
        name: '',
        active: true,
        type: 'Static',
        durationType: 'Regular Interval',
        timeLimit: '01 hrs 00 mins',
        checkInTime: 'Check in',
        reportRequired: false,
        attachmentsRequired: false,
      });
      setShowJobDutyForm(false);
    }
  };

  const handleCancelJobDuty = () => {
    setJobDutyData({
      id: '',
      name: '',
      active: true,
      type: 'Static',
      durationType: 'Regular Interval',
      timeLimit: '01 hrs 00 mins',
      checkInTime: 'Check in',
      reportRequired: false,
      attachmentsRequired: false,
    });
    setShowJobDutyForm(false);
  };

  // Custom Reports handlers
  const handleAddReport = () => {
    setShowCustomReportsDialog(true);
  };

  const handleReportsUpdate = (updatedReports: CustomReport[]) => {
    setCustomReports(updatedReports);
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Main Title */}
      <Typography variant="h4" sx={{
        fontWeight: 600,
        color: '#333',
        mb: 4,
        fontSize: '28px'
      }}>
        Site Info
      </Typography>

      {/* Site Instructions Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" sx={{
            color: 'var(--clr-purple)',
            fontWeight: 600,
            fontSize: '18px'
          }}>
            Site Instructions
          </Typography>
          <Button
            variant="outlined"
            onClick={handleAddInstruction}
            sx={{
              color: 'var(--clr-purple)',
              borderColor: 'var(--clr-purple)',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 600,
              px: 2,
              py: 1,
            }}
          >
            ADD SITE INSTRUCTION
          </Button>
        </Box>

        {/* Add Instruction Form */}
        {showInstructionForm && (
          <Box sx={{
            border: '1px solid var(--clr-purple)',
            borderRadius: 1,
            p: 3,
            mt: 2,
            mb: 3,

          }}>
            {/* Form Header */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'var(--clr-purple)',
                fontWeight: 600,
                fontSize: '16px'
              }}>
                ADD NEW INSTRUCTION
              </Typography>
              <IconButton
                onClick={handleCancelInstruction}
                sx={{ color: '#999' }}
              >
                <Close />
              </IconButton>
            </Box>

            {/* Form Content */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{
                mb: 2,
                color: '#666',
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                SITE INSTRUCTION
              </Typography>
              <TextField
                fullWidth
                multiline
                value={instructionText}
                onChange={(e) => setInstructionText(e.target.value)}
                placeholder="Enter site instruction..."
                className='input-field'
              />
            </Box>

            {/* Attachments Section */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="body2" sx={{
                mb: 2,
                color: '#666',
                fontWeight: 500,
                fontSize: '12px',
                textTransform: 'uppercase'
              }}>
                ATTACHMENTS (20 Maximum)
              </Typography>
              <input
                type="file"
                multiple
                style={{ display: 'none' }}
                id="attachment-upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="attachment-upload">
                <Box
                  sx={{
                    border: '2px dashed #e0e0e0',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    backgroundColor: 'white',
                    cursor: 'pointer',
                    '&:hover': {
                      borderColor: '#c0c0c0',
                      backgroundColor: '#f9f9f9',
                    }
                  }}
                >
                  <Add sx={{
                    fontSize: 40,
                    color: '#ccc',
                    mb: 1
                  }} />
                  <Typography variant="body2" sx={{ color: '#999' }}>
                    Click to add attachments
                  </Typography>
                </Box>
              </label>
              {attachments.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {attachments.map((file, idx) => (
                    <Chip
                      key={file.name + idx}
                      icon={<AttachFile sx={{ fontSize: 18 }} />}
                      label={file.name}
                      onDelete={() => handleRemoveAttachment(idx)}
                      deleteIcon={<Delete />}
                      sx={{ maxWidth: 200 }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Form Actions */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-start'
            }}>
              <Button
                variant="contained"
                onClick={handleSaveInstruction}
                sx={{
                  backgroundColor: 'var(--clr-purple)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                SAVE
              </Button>
              <Button
                variant="text"
                onClick={handleCancelInstruction}
                sx={{
                  color: '#666',
                  px: 4,
                  py: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '12px',
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                }}
              >
                BACK
              </Button>
            </Box>
          </Box>
        )}

        {/* Existing Instructions */}
        {siteInstructions.map((instruction) => (
          instruction.text && (
            <Box key={instruction.id} sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 2,
              borderBottom: '1px solid #f0f0f0'
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FiberManualRecord sx={{
                  color: '#999',
                  fontSize: '8px'
                }} />
                <Typography sx={{
                  color: '#666',
                  fontSize: '14px'
                }}>
                  {instruction.text}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: '#999' }}>
                <MoreVert />
              </IconButton>
            </Box>
          )
        ))}

        <Divider sx={{ borderColor: '#e0e0e0', mt: 2 }} />
      </Box>

      {/* Job Duties Section */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2
        }}>
          <Typography variant="h6" sx={{
            color: 'var(--clr-purple)',
            fontWeight: 600,
            fontSize: '18px'
          }}>
            Job Duties
          </Typography>
          <Button
            variant="outlined"
            onClick={handleAddJobDuty}
            sx={{
              color: 'var(--clr-purple)',
              borderColor: 'var(--clr-purple)',
              textTransform: 'uppercase',
              fontSize: '12px',
              fontWeight: 600,
              px: 2,
              py: 1,
            }}
          >
            ADD JOB DUTY
          </Button>
        </Box>

        {/* Job Duty Form */}
        {showJobDutyForm && (
          <Box sx={{
            border: '1px solid var(--clr-purple)',
            borderRadius: 1,
            p: 3,
            mt: 2,
            mb: 3,
          }}>
            {/* Form Header */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}>
              <Typography variant="h6" sx={{
                color: 'var(--clr-purple)',
                fontWeight: 600,
                fontSize: '16px'
              }}>
                Job Duty
              </Typography>
              <IconButton
                onClick={handleCancelJobDuty}
                sx={{ color: '#999' }}
              >
                <Close />
              </IconButton>
            </Box>

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              pb: 2,
              borderBottom: '1px solid #e0e0e0'
            }}>
              <Typography sx={{
                color: '#333',
                fontWeight: 500,
                fontSize: '16px'
              }}>
                Active Job Duty
              </Typography>
              <Switch
                checked={jobDutyData.active}
                onChange={(e) => setJobDutyData({...jobDutyData, active: e.target.checked})}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': {
                    color: 'var(--clr-purple)',
                  },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                    backgroundColor: 'var(--clr-purple)',
                  },
                }}
              />
            </Box>

            {/* Job Duty Name */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{
                mb: 1,
                color: '#666',
                fontWeight: 500,
                fontSize: '12px'
              }}>
                Job Duty
              </Typography>
              <TextField
                fullWidth
                value={jobDutyData.name}
                onChange={(e) => setJobDutyData({...jobDutyData, name: e.target.value})}
                placeholder="Job Duty 1"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'white',
                    '& fieldset': {
                      borderColor: '#e0e0e0',
                    },
                    '&:hover fieldset': {
                      borderColor: '#c0c0c0',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'var(--clr-purple)',
                    },
                  },
                }}
              />
            </Box>

            {/* Type Selection */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{
                mb: 2,
                color: '#666',
                fontWeight: 500,
                fontSize: '12px'
              }}>
                Type
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup
                  value={jobDutyData.type}
                  onChange={(e) => setJobDutyData({...jobDutyData, type: e.target.value as 'Static' | 'Mobile Patrol'})}
                  sx={{ flexDirection: 'row', gap: 3 }}
                >
                  <FormControlLabel
                    value="Static"
                    control={
                      <Radio
                        sx={{
                          color: '#ccc',
                          '&.Mui-checked': {
                            color: 'var(--clr-purple)',
                          },
                        }}
                      />
                    }
                    label="Static"
                  />
                  <FormControlLabel
                    value="Mobile Patrol"
                    control={
                      <Radio
                        sx={{
                          color: '#ccc',
                          '&.Mui-checked': {
                            color: 'var(--clr-purple)',
                          },
                        }}
                      />
                    }
                    label="Mobile Patrol"
                  />
                </RadioGroup>
              </FormControl>
            </Box>

            {/* Time Duration */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" sx={{
                mb: 2,
                color: '#666',
                fontWeight: 500,
                fontSize: '12px'
              }}>
                Time Duration
              </Typography>

              {jobDutyData.type === 'Static' ? (
                // Static Type Layout
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      Type
                    </Typography>
                    <Select
                      fullWidth
                      value={jobDutyData.durationType}
                      onChange={(e) => setJobDutyData({...jobDutyData, durationType: e.target.value})}
                      sx={{
                        backgroundColor: 'white',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e0e0e0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#c0c0c0',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'var(--clr-purple)',
                        },
                      }}
                    >
                      <MenuItem value="Regular Interval">Regular Interval</MenuItem>
                      <MenuItem value="One Time">One Time</MenuItem>
                      <MenuItem value="Custom">Custom</MenuItem>
                    </Select>
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      Time Limit
                    </Typography>
                    <TextField
                      fullWidth
                      value={jobDutyData.timeLimit}
                      onChange={(e) => setJobDutyData({...jobDutyData, timeLimit: e.target.value})}
                      placeholder="01 hrs 00 mins"
                      slotProps={{
                        input: {
                          endAdornment: <AccessTime sx={{ color: '#999', fontSize: 20 }} />
                        }
                      }}
                      className='input-field'
                    />
                  </Box>
                </Box>
              ) : (
                // Mobile Patrol Type Layout
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      Check in time
                    </Typography>
                    <TextField
                      fullWidth
                      
                      value={jobDutyData.checkInTime}
                      onChange={(e) => setJobDutyData({...jobDutyData, checkInTime: e.target.value})}
                      placeholder="Check in"
                      className='input-field'
                      InputProps={{ readOnly: true }}
                    />
                  </Box>

                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{
                      mb: 1,
                      color: '#666',
                      fontSize: '12px'
                    }}>
                      Time Limit
                    </Typography>
                    <TextField
                      fullWidth
                      value={jobDutyData.timeLimit}
                      onChange={(e) => setJobDutyData({...jobDutyData, timeLimit: e.target.value})}
                      placeholder="01 hrs 00 mins"
                      slotProps={{
                        input: {
                          endAdornment: <AccessTime sx={{ color: '#999', fontSize: 20 }} />
                        }
                      }}
                      className='input-field'
                    />
                  </Box>
                </Box>
              )}
            </Box>

            {/* Checkboxes */}
            <Box sx={{ mb: 4 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobDutyData.reportRequired}
                    onChange={(e) => setJobDutyData({...jobDutyData, reportRequired: e.target.checked})}
                    sx={{
                      color: '#ccc',
                      '&.Mui-checked': {
                        color: 'var(--clr-purple)',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#666' }}>
                      Report Required
                    </Typography>
                    <Description sx={{ color: 'var(--clr-purple)', fontSize: 16 }} />
                  </Box>
                }
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={jobDutyData.attachmentsRequired}
                    onChange={(e) => setJobDutyData({...jobDutyData, attachmentsRequired: e.target.checked})}
                    sx={{
                      color: '#ccc',
                      '&.Mui-checked': {
                        color: 'var(--clr-purple)',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography sx={{ fontSize: '14px', color: '#666' }}>
                      Attachments Required
                    </Typography>
                    <Box sx={{
                      backgroundColor: 'var(--clr-purple)',
                      borderRadius: '50%',
                      width: 16,
                      height: 16,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <AttachFile sx={{ color: 'white', fontSize: 10 }} />
                    </Box>
                  </Box>
                }
                sx={{ mt: 1 }}
              />
            </Box>

            {/* Form Actions */}
            <Box sx={{
              display: 'flex',
              gap: 2,
              justifyContent: 'flex-start'
            }}>
              <Button
                variant="contained"
                onClick={handleSaveJobDuty}
                sx={{
                  backgroundColor: 'var(--clr-purple)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  fontSize: '12px',
                }}
              >
                SAVE
              </Button>
            </Box>
          </Box>
        )}

        {/* Existing Job Duties */}
        {jobDuties.map((duty) => (
          <Box key={duty.id} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            py: 2,
            borderBottom: '1px solid #f0f0f0'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiberManualRecord sx={{
                color: duty.active ? '#4caf50' : '#999',
                fontSize: '8px'
              }} />
              <Typography sx={{
                color: '#666',
                fontSize: '14px'
              }}>
                {duty.name} ({duty.type})
              </Typography>
            </Box>
            <IconButton size="small" sx={{ color: '#999' }}>
              <MoreVert />
            </IconButton>
          </Box>
        ))}

        <Divider sx={{ borderColor: '#e0e0e0', mt: 2 }} />
      </Box>

      {/* Custom Reports Section */}
      <CustomReportsList
        reports={customReports}
        onAddReport={handleAddReport}
      />


      {/* Custom Reports Drawer */}
      <CustomReportsDrawer
        open={showCustomReportsDialog}
        onClose={() => setShowCustomReportsDialog(false)}
        reports={customReports}
        onReportsUpdate={handleReportsUpdate}
      />
    </Box>
  );
};

export default SiteInfo;
