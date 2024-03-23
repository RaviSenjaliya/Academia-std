import * as React from 'react';

import { Card, Container, Stack, Typography } from '@mui/material';
import SpeechDialog from '../sections/@dashboard/StudentQuery/SpeechDialog';
import ExcelExport from '../sections/@dashboard/StudentQuery/ExcelExport';
import StudentQueryForm from '../sections/@dashboard/StudentQuery/StudentQueryForm';

export default function StudentQuery() {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h4" gutterBottom>
            Student Help Desk
          </Typography>
          <SpeechDialog />
        </Stack>
        {/* ==================(edit popup)======================================== */}

        <Card
          style={{ height: '100%', width: '100%', backgroundColor: '#ffffff', padding: '8%' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <StudentQueryForm />
        </Card>
      </Container>
    </>
  );
}
