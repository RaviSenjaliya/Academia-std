import React, { useEffect, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import Link from '@mui/material/Link';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Card, Container, Grid, CardActionArea, Typography, Stack, styled, Box } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import './CSS/DownBTN.css';
import loadingimg from './img/loading.gif';
import dowIMG from './img/u4.1.pdf';

const Syllabus = () => {
  const [subData, setsubData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://tender-duck-pantsuit.cyclic.app/api/subject`).then((subjectResponse) => {
      const allSubjects = subjectResponse.data;

      const storedData = JSON.parse(localStorage.getItem('StudentIn'));
      const id = storedData.dumID;

      axios.get(`https://tender-duck-pantsuit.cyclic.app/api/students/${id}`).then((studentResponse) => {
        const coursesArray = studentResponse.data.course.split(',').map((course) => course.trim());

        const filteredSubjects = allSubjects.filter((subject) => coursesArray.includes(subject.subject));

        setsubData(filteredSubjects);
        setLoading(false); // Set loading to false after data is fetched
      });
    });
  }, []);

  // The rest of your code remains the same

  const [expanded, setExpanded] = useState(false);
  const [expanded1, setExpanded1] = useState(false);

  const handleChange1 = (panel) => (event, isExpanded) => {
    setExpanded1(isExpanded ? panel : false);
  };
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const [rows, setRows] = useState([]);
  const [Drows, DsetRows] = useState([]);
  const [Nrows, NsetRows] = useState([]);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClickOpen = (index) => {
    setOpen(true);
    setActiveIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // ============================================================================

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get(`https://tender-duck-pantsuit.cyclic.app/api/subassignment`).then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        setRows(filteredData);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get('https://tender-duck-pantsuit.cyclic.app/api/subdrive').then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        DsetRows(filteredData);
      });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex !== null) {
      axios.get('https://tender-duck-pantsuit.cyclic.app/api/subnotice').then((r) => {
        const data = r.data;
        const subjectName = subData[activeIndex].subject;
        const filteredData = data
          .filter((value) => value.subject === subjectName)
          .map((value, index) => {
            value.id = index + 1;
            return value;
          });
        NsetRows(filteredData);
      });
    }
  }, [activeIndex]);

  return (
    <Container>
      {/* ===============================(syllabus)=============================================================== */}

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" sx={{ mb: 1 }}>
            Subject
          </Typography>
        </Stack>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={loadingimg} alt="" />
          </div>
        ) : (
          <Grid container spacing={3}>
            {subData.map((val, index) => {
              return (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card sx={{ maxWidth: 530 }} onClick={() => handleClickOpen(index)}>
                    <CardActionArea>
                      <CardMedia component="img" height="100" image={val.imgurl} alt="green iguana" />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {val.subject}
                        </Typography>
                        <Typography gutterBottom variant="p" component="div" color="text.secondary">
                          <span>
                            <PersonIcon /> - {val.subteken}
                          </span>
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* ===============================(popup)=============================================================== */}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="md"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="pt-4 pb-4 sub-image">
          {activeIndex !== null ? subData[activeIndex].subject : ''}
        </DialogTitle>
        <DialogContent className="mt-5">
          {/* ===============================(Drive)=============================================================== */}

          <div className="  my-5 contantCenter  ">
            <div
              className="row d-flex justify-content-center text-center align-items-center "
              style={{ maxHeight: '140px', overflowY: 'scroll' }}
            >
              {Drows.length > 0 ? (
                Drows.map((val, index) => {
                  return (
                    <Box
                      className="col-sm-3 p-3 mb-4 course "
                      key={index}
                      sx={{ boxShadow: 3, borderRadius: '7px', border: '3px solid #e7a24d' }}
                    >
                      <div className="row">
                        <div className="img col-4 ">
                          <img src="https://zenoxerp.com/assets-web/img/demo-content/icons/icon27.svg" alt="img" />
                        </div>
                        <div className="info-box-content d-flex justify-content-center align-items-center col-8 ">
                          <Link href={val.drivelink} style={{ textDecoration: 'none' }} target="_blank">
                            <h5 className="info-box-title ">{val.drivename}</h5>
                          </Link>
                        </div>
                      </div>
                    </Box>
                  );
                })
              ) : (
                <Box
                  className="col-sm-3 p-3 mb-4 course"
                  sx={{ boxShadow: 3, borderRadius: '7px', border: '3px solid #e7a24d' }}
                >
                  <div className="row">
                    <div className="img col-4" style={{ fontSize: '40px' }}>
                      😅
                    </div>
                    <div className="info-box-content d-flex justify-content-center align-items-center col-8">
                      <h5 className="info-box-title">No link</h5>
                    </div>
                  </div>
                </Box>
              )}
            </div>
          </div>

          {/* ===============================(notice)=============================================================== */}
          <h4 className=" p-2 rounded-2 mb-4" style={{ backgroundColor: '#e8f0fe' }}>
            Notice Board
          </h4>

          {Nrows.length > 0 ? (
            Nrows.map((val, index) => {
              return (
                <Accordion expanded={expanded1 === index} onChange={handleChange1(index)}>
                  <AccordionSummary
                    sx={{ backgroundColor: '#feefe3cf', borderLeft: '6px solid #e7a24d' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ flexShrink: 0 }}>{val.notice}</Typography>
                    {/* <Typography sx={{ width: '50%', color: 'text.secondary' }}>I am an accordion</Typography> */}
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>{val.noticebig}</div>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <div>
              <p>No Notice Found...</p>
            </div>
          )}

          {/* ===============================(Assignment)=============================================================== */}
          <h4 className=" p-2 rounded-2 mt-5 mb-4" style={{ backgroundColor: '#e8f0fe' }}>
            Assignment
          </h4>

          {rows.length > 0 ? (
            rows?.map((val, index) => {
              console.log('=========================');
              console.log(val.asspdf);
              return (
                <Accordion expanded={expanded === index} onChange={handleChange(index)}>
                  <AccordionSummary
                    sx={{ backgroundColor: '#feefe3cf', borderLeft: '6px solid #e7a24d' }}
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography sx={{ flexShrink: 0 }} style={{ maxWidth: '100%', overflowX: 'hidden' }}>
                      {val.description} - <small> Due ({val.duedate})</small>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>{val.assbig}</div>
                    <div className="mt-3">
                      <a href={dowIMG} download>
                        <button className="download-button">
                          <div className="docs">
                            <svg
                              className="css-i6dzq1"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              fill="none"
                              strokeWidth="2"
                              stroke="currentColor"
                              height="20"
                              width="20"
                              viewBox="0 0 24 24"
                            >
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                              <polyline points="14 2 14 8 20 8" />
                              <line y2="13" x2="8" y1="13" x1="16" />
                              <line y2="17" x2="8" y1="17" x1="16" />
                              <polyline points="10 9 9 9 8 9" />
                            </svg>
                            Download
                          </div>
                          <div className="download">
                            <svg
                              className="css-i6dzq1"
                              strokeLinejoin="round"
                              strokeLinecap="round"
                              fill="none"
                              strokeWidth="2"
                              stroke="currentColor"
                              height="24"
                              width="24"
                              viewBox="0 0 24 24"
                            >
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line y2="3" x2="12" y1="15" x1="12" />
                            </svg>
                          </div>
                        </button>
                      </a>
                    </div>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <div>
              <p>No Assignment Found...</p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Back
          </Button>
        </DialogActions>
      </Dialog>
      {/* ===============================(time table)=============================================================== */}

      <Card
        style={{ height: 500, marginTop: '58px', width: '100%', backgroundColor: '#ffffff', overflow: 'scroll' }}
        sx={{ boxShadow: 3, borderRadius: '16px' }}
      >
        <img
          src="https://www.pmsboduppal.com/wp-content/uploads/2019/11/PERIODIC-ASSESSMENT-III-Time-table-std-1-10-1-1.jpg"
          alt="time-table"
        />
      </Card>
    </Container>
  );
};

export default Syllabus;
