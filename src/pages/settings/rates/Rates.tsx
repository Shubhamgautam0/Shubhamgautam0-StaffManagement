import React from 'react';
import { Box } from '@mui/material';
import PayRate from './PayRate';
import BillRate from './BillRate';

interface RatesProps {
  selectedSubItem: string;
}

const Rates: React.FC<RatesProps> = ({ selectedSubItem }) => {
  const renderContent = () => {
    switch (selectedSubItem) {
      case 'Pay Rate':
        return <PayRate />;
      case 'Bill Rates':
        return <BillRate />;
      default:
        return <PayRate />;
    }
  };

  return (
    <Box>
      {renderContent()}
    </Box>
  );
};

export default Rates;
