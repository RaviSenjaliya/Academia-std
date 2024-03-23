import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CardContent from '@mui/material/CardContent';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import { Button, Card, Container, Grid, CardActionArea, Typography, Box } from '@mui/material';
import Accordion from 'react-bootstrap/Accordion';
import '../sections/@dashboard/Master/scrollbar.css';

const AdvancedERPapi = [
  {
    url: 'https://zenoxerp.com/assets-web/img/demo-content/icons/icon25.svg',
    title: 'Student Management',
    text: 'Our School management Software keeps track of all student’s information and leads that can be used for follow up. Tracking of those leads to conversion to admission and document upload.',
  },
  {
    url: 'https://zenoxerp.com/assets-web/img/demo-content/icons/icon27.svg',
    title: 'Students Academics',
    text: 'Our school management software manages online examination, offline marks upload, Certifications, marksheet, bonafide, TC, LC & other certificates with complete examination reports.',
  },
  {
    url: 'https://zenoxerp.com/assets-web/img/demo-content/icons/icon28.svg',
    title: 'Accounting & Finance',
    text: 'At our school management system we provide complete modern accounting with in depth P & L, balance sheet, ledger, trial account, purchase, inventory, expenses, journal entries on basis of accrual & cash.',
  },
];

const Syllabus = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const myNav = useNavigate();

  const category = () => {
    myNav('/category');
  };
  const Table = () => {
    myNav('/Table');
  };

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 3, mt: 3 }}>
          Subject
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            {/* <Link
              href="https://drive.google.com/drive/folders/1WfgKy03b9CU1jC72Fd4cSahc1p9oAPZW?usp=sharing"
              underline="none"
            > */}
            <Card sx={{ maxWidth: 530 }} onClick={handleClickOpen}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image="https://static.vecteezy.com/system/resources/thumbnails/003/323/638/small/flat-teachers-day-background-free-vector.jpg"
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            {/* </Link> */}
          </Grid>
        </Grid>
      </Container>

      <Dialog
        open={open}
        onClose={handleClose}
        // fullScreen
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pt-4 pb-4 sub-image">
          {'Subject name'}
        </DialogTitle>
        <DialogContent>
          <div className="  my-5 contantCenter ">
            <div className="row">
              {AdvancedERPapi.map((val, index) => {
                return (
                  <Box
                    className="col-lg-3 col-md-5 col-sm-5 col-xs-6 p-3 mb-4 course"
                    key={index}
                    sx={{ boxShadow: 3, borderRadius: '7px', border: '3px solid #e7a24d' }}
                  >
                    <div className="row">
                      <div className="img col-4 ">
                        <img src={val.url} alt="img" />
                      </div>
                      <div className="info-box-content d-flex justify-content-center align-items-center col-8 ">
                        <Link
                          href="https://www.w3schools.com/css/css3_mediaqueries.asp"
                          style={{ textDecoration: 'none' }}
                          target="_blank"
                        >
                          <h5 className="info-box-title ">{val.title}</h5>
                        </Link>
                      </div>
                    </div>
                  </Box>
                );
              })}
            </div>
          </div>
          {/* ============================================================================= */}
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Notice Board</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Assignment</Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Time-table
      </Typography>
      <Card
        style={{ height: 500, width: '100%', backgroundColor: '#ffffff', overflow: 'scroll' }}
        sx={{ boxShadow: 3, borderRadius: '16px' }}
      >
        <img
          src="https://www.pmsboduppal.com/wp-content/uploads/2019/11/PERIODIC-ASSESSMENT-III-Time-table-std-1-10-1-1.jpg"
          alt="time-table"
        />
      </Card>
    </>
  );
};

export default Syllabus;
