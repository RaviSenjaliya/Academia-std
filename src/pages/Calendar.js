import * as React from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import axios from 'axios';
import { GridActionsCellItem } from '@mui/x-data-grid-pro';
import { Card, Container, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ReactBigCalendar from '../sections/@dashboard/FullCalendar/ReactBigCalendar';

export default function Calendar() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Event calendar
          </Typography>
        </Stack>
        <Card
          style={{ height: 500, width: '100%', backgroundColor: '#ffffff' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <ReactBigCalendar />
        </Card>
      </Container>
    </>
  );
}
