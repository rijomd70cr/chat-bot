import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AlertTitle } from '@mui/material';

export default function BasicAlerts({ type = "success", title = "", children }) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={type} title='ddasda'>
        {title ? <AlertTitle>{title}</AlertTitle> : null }
        {children}
      </Alert>
    </Stack>
  );
}