import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import axios from 'axios';
import {
  Box,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import gif from './img/icons8-receipt.gif';
import FeesDetailed from '../sections/@dashboard/Fees/FeesDetailed';
import FeesDialog from '../sections/@dashboard/Fees/FeesDialog';
import notFound from './img/not_found.svg';
import loadingimg from './img/loading.gif';

export default function Fees() {
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(-1);
  const [userdet, setuserdet] = useState({});
  const [loading, setLoading] = useState(true);

  // ========================================================

  const [openuserDetail, setOpenuserDetail] = React.useState(false);
  const handleShowClick = (id) => () => {
    setuserdet(id);
    setOpenuserDetail(true);
  };

  const handleShowClose = () => {
    setOpenuserDetail(false);
  };
  // ========================================================
  const storedData = JSON.parse(localStorage.getItem('StudentIn'));
  const id = storedData.id;
  useEffect(() => {
    axios.get(`https://tender-duck-pantsuit.cyclic.app/api/fees`).then((r) => {
      const filteredData = r.data.filter((value) => value.feesid === id); // Filter data based on feesid === id
      const modifiedData = filteredData.map((value, index) => {
        value.id = index + 1;
        return value;
      });
      setRows(modifiedData);
      setLoading(false); // Set loading to false after data is fetched
    });
  }, [edit]);

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Fees
          </Typography>
          <FeesDialog changeEdit={setEdit} rows={rows} />
        </Stack>

        {/* =========================(fees info )==================================================== */}

        <Dialog
          open={openuserDetail}
          onClose={handleShowClose}
          fullWidth
          maxWidth="sm"
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Print Fee Receipt'}</DialogTitle>
          <DialogContent>
            {/* ============================================================================= */}

            <FeesDetailed handleShowClose={handleShowClose} userdet={userdet} />

            {/* ============================================================================= */}
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleShowClose}>
              Back
            </Button>
          </DialogActions>
        </Dialog>

        {/* ========================================================================== */}
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingimg} alt="" />
          </div>
        ) : (
          <div className="  my-5 contantCenter ">
            <div className="row">
              {rows.length > 0 ? (
                rows.map((val, index) => (
                  <Box
                    style={{ cursor: 'pointer' }}
                    className="col-sm-3 p-3 mb-4 course"
                    key={index}
                    sx={{ boxShadow: 3, borderRadius: '7px', border: '3px solid #e7a24d' }}
                    onClick={handleShowClick(val._id)}
                  >
                    <div className="row">
                      <div className="img col-4 ">
                        <img src={gif} alt="img" />
                      </div>
                      <div className="info-box-content d-flex justify-content-center align-items-center col-8">
                        <h4 className="info-box-title">{val.totamt} ₹</h4>
                      </div>
                    </div>
                  </Box>
                ))
              ) : (
                <div className="col-12 text-center justify-content-center align-items-center d-flex">
                  <img src={notFound} alt="data not found gif" width="40%" />
                </div>
              )}
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
