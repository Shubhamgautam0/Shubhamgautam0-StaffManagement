import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Button,
  IconButton,
  Drawer
} from '@mui/material';
import {
  Archive,
  ViewList,
  Add
} from '@mui/icons-material';

import CustomerList from './CustomerList';
import CustomerDetail from './CustomerDetail';
import AddCustomerForm from './AddCustomerForm';
import { getAllCustomers, type SiteCustomer } from '../../data/siteData';

const CustomerPage: React.FC = () => {
  const [customers, setCustomers] = useState<SiteCustomer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<SiteCustomer | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [detailView, setDetailView] = useState(true);

  // Auto-select first customer on component mount
  useEffect(() => {
    const customerData = getAllCustomers();
    setCustomers(customerData);

    if (customerData.length > 0 && !selectedCustomer) {
      setSelectedCustomer(customerData[0]);
    }
  }, []);

  const handleCustomerSelect = (customer: SiteCustomer) => {
    setSelectedCustomer(customer);
  };

  const handleAddCustomer = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const handleCustomerAdded = (newCustomer: SiteCustomer) => {
    setCustomers(prev => [...prev, newCustomer]);
    setSelectedCustomer(newCustomer);
    setShowAddForm(false);
  };

  const handleCustomerUpdate = (updatedCustomer: SiteCustomer) => {
    setCustomers(prev =>
      prev.map(customer =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
    setSelectedCustomer(updatedCustomer);
  };

  return (
    <Box className="page-container">
      {/* Header with buttons */}
      <Box className="customer-page-header">
        <Box className="customer-header-left">
          <Button
            variant="outlined"
            startIcon={<Archive />}
            onClick={() => setShowArchived(!showArchived)}
            className="archived-customers-button"
          >
            Archived Customers
          </Button>
        </Box>

        <Box className="customer-header-right">
          <Button
            variant="outlined"
            startIcon={<ViewList />}
            onClick={() => setDetailView(!detailView)}
            className="detail-view-button"
          >
            Detail View
          </Button>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddCustomer}
            className="add-customer-header-button"
          >
            Add Customer
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} className="grid-container">
        {/* Customer List */}
        <Grid size={{ xs: 12, md: 4 }} className="grid-item">
          <Paper className="paper-container">
            <CustomerList
              customers={customers}
              selectedCustomer={selectedCustomer}
              onCustomerSelect={handleCustomerSelect}
            />
          </Paper>
        </Grid>

        {/* Customer Details */}
        <Grid size={{ xs: 12, md: 8 }} className="grid-item">
          <Paper className="paper-container">
            <CustomerDetail
              customer={selectedCustomer}
              onCustomerUpdate={handleCustomerUpdate}
              onEdit={() => {}}
            />
          </Paper>
        </Grid>
      </Grid>

      {/* Add Customer Form Drawer */}
      <Drawer
        anchor="right"
        open={showAddForm}
        onClose={handleCloseAddForm}
        className="add-customer-drawer"
        slotProps={{
          paper: {
            className: "add-customer-drawer-paper"
          }
        }}
      >
        <AddCustomerForm
          open={showAddForm}
          onClose={handleCloseAddForm}
          onCustomerAdded={handleCustomerAdded}
          isDrawer={true}
        />
      </Drawer>
    </Box>
  );
};

export default CustomerPage;
