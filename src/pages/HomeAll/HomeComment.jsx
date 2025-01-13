import * as React from 'react';
import Box from '@mui/material/Box';
import { ThemeProvider } from '@mui/material/styles';

export default function BoxSx() {
  return (
    <ThemeProvider
      theme={{
        palette: {
          primary: {
            main: 'gray',
          },
        },
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '250px',
          bgcolor: 'primary.main',
        }}
      />
    </ThemeProvider>
  );
}