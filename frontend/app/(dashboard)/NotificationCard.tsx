'use client';

import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import React from 'react';
import { Warning, Error, Info } from '@mui/icons-material';
import { format } from 'date-fns'; // To format the date

export interface NotificationProps {
  id: number;
  message: string;
  date: Date;
  type: string; 
}

const NotificationCard = ({ notification }: { notification: NotificationProps }) => {
  // Format the date for better readability
  const formattedDate = format(new Date(notification.date), 'PPpp'); // Example: Aug 24, 2023, 10:24 PM

  return (
    <Card 
      sx={{ 
        mb: 2, 
        p: 2, 
        border: '1px solid', 
        borderColor: 'primary.main', 
        borderRadius: 2, 
        boxShadow: 3, // Increase shadow for more depth
        backgroundColor: 'background.default', // Subtle background color from the theme
        position: 'relative',
        overflow: 'visible' 
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ p: 0 }}>
          {notification.type === 'warning' && <Warning color="warning" sx={{ fontSize: 32 }} />}
          {notification.type === 'error' && <Error color="error" sx={{ fontSize: 32 }} />}
          {notification.type === 'info' && <Info color="primary" sx={{ fontSize: 32 }} />}
        </IconButton>

        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            {notification.message}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationCard;
