import React from 'react';
import { Box } from '@mui/material';
import SiteSettings from './SiteSettings';
import SiteCustomField from './SiteCustomField';

interface SiteProps {
  selectedSubItem: string;
}

const Site: React.FC<SiteProps> = ({ selectedSubItem }) => {
  const renderContent = () => {
    switch (selectedSubItem) {
      case 'Site Setting':
        return <SiteSettings selectedSubItem={selectedSubItem} />;
      case 'Custom Field':
        return <SiteCustomField />;
      default:
        return <SiteSettings selectedSubItem={selectedSubItem} />;
    }
  };

  return (
    <Box>
      {renderContent()}
    </Box>
  );
};

export default Site;
