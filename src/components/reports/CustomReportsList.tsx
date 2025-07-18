import React from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import type { CustomReport } from '../../data/reportsData';

interface CustomReportsListProps {
  reports: CustomReport[];
  onAddReport: () => void;
}

const CustomReportsList: React.FC<CustomReportsListProps> = ({
  reports,
  onAddReport,
}) => {
  const selectedReports = reports.filter(report => report.selected);

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
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
          Custom Reports
        </Typography>
        <Button
          variant="outlined"
          onClick={onAddReport}
          sx={{
            color: 'var(--clr-purple)',
            borderColor: 'var(--clr-purple)',
            textTransform: 'uppercase',
            fontSize: '12px',
            fontWeight: 600,
            px: 2,
            py: 1,
            '&:hover': {
              borderColor: 'var(--clr-purple)',
              backgroundColor: 'rgba(142, 110, 200, 0.04)',
            },
          }}
        >
          ADD REPORT
        </Button>
      </Box>

      {/* Reports List */}
      {selectedReports.length > 0 ? (
        <List sx={{ p: 0 }}>
          {selectedReports.map((report, index) => (
            <React.Fragment key={report.id}>
              <ListItem
                sx={{
                  px: 0,
                  py: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: report.color,
                    }}
                  />
                  <Typography sx={{
                    color: 'var(--clr-text-secondary)',
                    fontSize: '14px'
                  }}>
                    {report.name}
                  </Typography>
                </Box>
                <IconButton size="small" sx={{ color: 'var(--clr-text-tertiary)' }}>
                  <MoreVert />
                </IconButton>
              </ListItem>
              {index < selectedReports.length - 1 && (
                <Divider sx={{ borderColor: 'var(--clr-border-lighter)' }} />
              )}
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Box sx={{
          textAlign: 'center',
          py: 4,
          color: 'var(--clr-text-tertiary)',
        }}>
          <Typography variant="body2">
            No custom reports selected
          </Typography>
        </Box>
      )}

      <Divider sx={{ borderColor: 'var(--clr-border-light)', mt: 2 }} />
    </Box>
  );
};

export default CustomReportsList;
