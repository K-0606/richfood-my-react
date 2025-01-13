import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function SearchPagination() {
  return (
    <Stack spacing={2} 
    sx={{
        alignItems: 'center',
        marginTop: '30px', 
        marginBottom: '30px',
        }}>
      <Pagination count={10} />
    </Stack>
  );
}
