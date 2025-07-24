import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  Button
} from '@mui/material';
import { Search, MoreVert, Add } from '@mui/icons-material';
import { getAllCustomers, type SiteCustomer } from '../../data/siteData';

interface CustomerListProps {
  onCustomerSelect: (customer: SiteCustomer) => void;
  selectedCustomer: SiteCustomer | null;
  onAddCustomer?: () => void;
  customers: SiteCustomer[];
}

const CustomerList: React.FC<CustomerListProps> = ({
  onCustomerSelect,
  selectedCustomer,
  onAddCustomer,
  customers
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<SiteCustomer[]>(customers);

  useEffect(() => {
    const filtered = customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm)
    );
    setFilteredCustomers(filtered);
  }, [searchTerm, customers]);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string): string => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };



  return (
    <Paper className="customer-list-container">
      <Box className="customer-list-header">
        <Box className="customer-list-title-section">
          <Typography variant="h6" className="customer-list-title">
            Customers
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          placeholder="Search customer by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search className="search-icon" />
              </InputAdornment>
            ),
          }}
          className="customer-search-field"
        />
      </Box>

      <Box className="customer-list-content">
        <List className="customer-list">
          {filteredCustomers.map((customer) => (
            <React.Fragment key={customer.id}>
              <ListItem
                component="div"
                onClick={() => onCustomerSelect(customer)}
                className={`customer-list-item ${
                  selectedCustomer?.id === customer.id ? 'selected' : ''
                }`}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemAvatar>
                  <Avatar
                    className="customer-avatar"
                    style={{ backgroundColor: getAvatarColor(customer.name) }}
                  >
                    {getInitials(customer.name)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle1" className="customer-name">
                      {customer.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" className="customer-phone">
                      {customer.phone}
                    </Typography>
                  }
                />
                <IconButton size="small" className="customer-menu-button">
                  <MoreVert />
                </IconButton>
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>

        {filteredCustomers.length === 0 && (
          <Box className="no-customers-message">
            <Typography variant="body1" color="textSecondary">
              No customers found
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default CustomerList;
