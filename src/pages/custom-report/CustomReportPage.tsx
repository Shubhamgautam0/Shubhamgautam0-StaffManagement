import React, { useState, useEffect } from 'react';
import { Box, Paper, Grid, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';

import ReportList from './ReportList';
import ReportDetails from './ReportDetails';
import CustomReportsDialog from '../../components/reports/CustomReportsDialog';
import { defaultReports } from '../../data/reportsData';
import { SiteData } from '../../data/siteData';

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
  priority?: string;
  assignToAllSites?: boolean;
  fields?: any[];
  createdDate?: string;
}

const CustomReportPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<CustomReport | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reports, setReports] = useState(defaultReports);
  const [customReports, setCustomReports] = useState<CustomReport[]>([]);

  // Load existing custom reports from siteData on component mount
  useEffect(() => {
    loadCustomReportsFromSiteData();
  }, []);

  const loadCustomReportsFromSiteData = () => {
    const allCustomReports: CustomReport[] = [];

    SiteData.forEach(site => {
      if (site.reports) {
        site.reports.forEach(report => {
          // Check if this is a custom report (has additional fields)
          if ((report as any).isCustomReport) {
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
            allCustomReports.push(customReport);
          }
        });
      }
    });

    setCustomReports(allCustomReports);
  };

  const handleReportSelect = (report: CustomReport) => {
    setSelectedReport(report);
  };

  const handleReportUpdate = (updatedReport: CustomReport) => {
    setSelectedReport(updatedReport);
    // Update the report in siteData
    updateReportInSiteData(updatedReport);
  };

  const updateReportInSiteData = (updatedReport: CustomReport) => {
    SiteData.forEach(site => {
      if (site.reports) {
        const reportIndex = site.reports.findIndex(r => r.id === updatedReport.id);
        if (reportIndex !== -1) {
          // Update the existing report with new data
          site.reports[reportIndex] = {
            ...site.reports[reportIndex],
            ...updatedReport,
            isCustomReport: true
          };
        }
      }
    });

    // Reload custom reports to reflect changes
    loadCustomReportsFromSiteData();
  };

  const handleReportsUpdate = (updatedReports: any[]) => {
    // Handle new reports created from the dialog
    updatedReports.forEach(newReport => {
      if (!customReports.find(r => r.id === newReport.id)) {
        // This is a new report, add it to siteData
        addNewReportToSiteData(newReport);
      }
    });

    setReports(updatedReports);
    loadCustomReportsFromSiteData();
  };

  const addNewReportToSiteData = (newReport: any) => {
    const customReport: CustomReport = {
      id: newReport.id || `custom-${Date.now()}`,
      name: newReport.name,
      type: newReport.type || 'office',
      description: newReport.description || '',
      siteId: '1', // Default to first site, can be modified
      siteName: SiteData[0]?.name || 'Default Site',
      date: new Date().toISOString().split('T')[0],
      startTime: '09:00',
      endTime: '17:00',
      dutyStatus: 'Duty Not Started',
      staffName: 'Unassigned',
      staffInitials: 'UN',
      reportStatus: 'Not Sent',
      timeDuration: '09:00a - 17:00p',
      status: 'active',
      color: getColorByType(newReport.type || 'office'),
      priority: newReport.priority,
      assignToAllSites: newReport.assignToAllSites,
      fields: newReport.fields,
      createdDate: new Date().toISOString()
    };

    // Add to the first site's reports (or all sites if assignToAllSites is true)
    if (newReport.assignToAllSites) {
      SiteData.forEach(site => {
        if (!site.reports) site.reports = [];
        site.reports.push({
          ...customReport,
          siteId: site.id,
          siteName: site.name,
          isCustomReport: true
        } as any);
      });
    } else {
      if (!SiteData[0].reports) SiteData[0].reports = [];
      SiteData[0].reports.push({
        ...customReport,
        isCustomReport: true
      } as any);
    }
  };

  const getColorByType = (type: string): string => {
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

  const handleFabClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Box className="page-container">
      <Grid container spacing={2} className="grid-container">
        {/* Report List */}
        <Grid size={{ xs: 12, md: 4 }} className="grid-item">
          <Paper className="paper-container">
            <ReportList
              selectedReport={selectedReport}
              onReportSelect={handleReportSelect}
              customReports={customReports}
            />
          </Paper>
        </Grid>

        {/* Report Details */}
        <Grid size={{ xs: 12, md: 8 }} className="grid-item">
          <Paper className="paper-container">
            <ReportDetails
              report={selectedReport}
              onReportUpdate={handleReportUpdate}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        className="custom-report-fab"
        onClick={handleFabClick}
      >
        <Add />
      </Fab>

      {/* Custom Reports Dialog */}
      <CustomReportsDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        reports={reports}
        onReportsUpdate={handleReportsUpdate}
      />
    </Box>
  );
};

export default CustomReportPage;
