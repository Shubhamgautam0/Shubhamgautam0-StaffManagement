import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider
} from '@mui/material';
import { Search, MoreVert } from '@mui/icons-material';
import { SiteData } from '../../data/siteData';

interface ReportListProps {
  onReportSelect: (report: CustomReport) => void;
  selectedReport: CustomReport | null;
  customReports?: CustomReport[];
}

interface CustomReport {
  id: string;
  name: string;
  type: 'office' | 'incident' | 'daily-activity';
  description: string;
  siteId: string;
  siteName: string;
  date: string;
  startTime: string;
  endTime: string;
  dutyStatus: 'Duty Started' | 'Duty Not Started' | 'Duty Completed';
  staffName: string;
  staffInitials: string;
  reportStatus: 'All' | 'Not Sent' | 'Approved';
  timeDuration: string;
  status: 'active' | 'draft' | 'archived';
  color: string;
  // New fields from dialog
  priority?: string;
  assignToAllSites?: boolean;
  fields?: any[];
  createdDate?: string;
}

const ReportList: React.FC<ReportListProps> = ({
  onReportSelect,
  selectedReport,
  customReports = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState<CustomReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<CustomReport[]>([]);

  useEffect(() => {
    // Extract reports from site data
    const extractReportsFromSiteData = (): CustomReport[] => {
      const allReports: CustomReport[] = [];

      // Define report type mapping based on report status or other criteria
      const getReportType = (reportStatus: string): 'office' | 'incident' | 'daily-activity' => {
        switch (reportStatus) {
          case 'All':
            return 'office';
          case 'Approved':
            return 'incident';
          case 'Not Sent':
            return 'daily-activity';
          default:
            return 'office';
        }
      };

      const getReportColor = (type: 'office' | 'incident' | 'daily-activity'): string => {
        switch (type) {
          case 'office':
            return '#FF9800';
          case 'incident':
            return '#F44336';
          case 'daily-activity':
            return '#4CAF50';
          default:
            return '#2196F3';
        }
      };

      const getReportStatus = (reportStatus: string): 'active' | 'draft' | 'archived' => {
        switch (reportStatus) {
          case 'Approved':
            return 'active';
          case 'Not Sent':
            return 'draft';
          default:
            return 'active';
        }
      };

      // Extract reports from each site
      SiteData.forEach(site => {
        if (site.reports && site.reports.length > 0) {
          site.reports.forEach(report => {
            // Check if this is a custom report or regular report
            if ((report as any).isCustomReport) {
              // This is a custom report, use its data directly
              const customReport: CustomReport = {
                id: report.id,
                name: (report as any).name || `Custom Report ${report.id}`,
                type: (report as any).type || 'office',
                description: (report as any).description || '',
                siteId: report.siteId,
                siteName: report.siteName,
                date: report.date,
                startTime: report.startTime,
                endTime: report.endTime,
                dutyStatus: report.dutyStatus,
                staffName: report.staffName,
                staffInitials: report.staffInitials,
                reportStatus: report.reportStatus,
                timeDuration: report.timeDuration,
                status: 'active',
                color: (report as any).color || '#2196F3',
                priority: (report as any).priority,
                assignToAllSites: (report as any).assignToAllSites,
                fields: (report as any).fields,
                createdDate: (report as any).createdDate
              };
              allReports.push(customReport);
            } else {
              // This is a regular report, convert it
              const reportType = getReportType(report.reportStatus);
              const customReport: CustomReport = {
                id: report.id,
                name: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
                type: reportType,
                description: `${reportType.replace('-', ' ')} report for ${site.name}`,
                siteId: report.siteId,
                siteName: report.siteName,
                date: report.date,
                startTime: report.startTime,
                endTime: report.endTime,
                dutyStatus: report.dutyStatus,
                staffName: report.staffName,
                staffInitials: report.staffInitials,
                reportStatus: report.reportStatus,
                timeDuration: report.timeDuration,
                status: getReportStatus(report.reportStatus),
                color: getReportColor(reportType)
              };
              allReports.push(customReport);
            }
          });
        }
      });

      // Add custom reports from props
      customReports.forEach(customReport => {
        // Only add if not already in the list
        if (!allReports.find(r => r.id === customReport.id)) {
          allReports.push(customReport);
        }
      });

      return allReports;
    };

    const extractedReports = extractReportsFromSiteData();
    setReports(extractedReports);
    setFilteredReports(extractedReports);
  }, [customReports]);

  useEffect(() => {
    const filtered = reports.filter(report =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredReports(filtered);
  }, [searchTerm, reports]);



  return (
    <Paper className="report-list-container">
      <Box className="report-list-header">
        <Typography variant="h6" className="report-list-title">
          Custom Report
        </Typography>
        
        <TextField
          fullWidth
          placeholder="Search / Create New Report..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <Search className="search-icon" />
                </InputAdornment>
              ),
            },
          }}
          className="report-search-field"
        />
      </Box>

      <Box className="report-list-content">
        <List className="report-list">
          {filteredReports.map((report) => (
            <React.Fragment key={report.id}>
              <ListItem
                component="div"
                onClick={() => onReportSelect(report)}
                className={`report-list-item ${
                  selectedReport?.id === report.id ? 'selected' : ''
                }`}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemAvatar>
                  <Box
                    className="report-circle"
                    style={{ backgroundColor: report.color }}
                  >
                  </Box>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="report-name">
                      {report.name}
                    </Typography>
                  }
                />
                <IconButton size="small" className="report-menu-button">
                  <MoreVert />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
        
        {filteredReports.length === 0 && (
          <Box className="no-reports-message">
            <Typography variant="body1" color="textSecondary">
              No reports found
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default ReportList;
