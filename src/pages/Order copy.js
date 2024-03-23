import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, Container, Stack, Typography } from '@mui/material';

export default function Order() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Order
          </Typography>
        </Stack>

        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <h1>hello</h1>
        </Card>
      </Container>
    </>
  );
}
