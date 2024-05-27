import React, { useEffect, useState } from 'react';
import { Button, Grid, TextareaAutosize, styled } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import axios from 'axios';
import './Speech.css';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const StudentQueryForm = (props) => {
  const [subData, setsubData] = useState([]);

  useEffect(() => {
    axios.get(`https://academia-api-cu1m.onrender.com/api/subject`).then((subjectResponse) => {
      const allSubjects = subjectResponse.data;

      const storedData = JSON.parse(localStorage.getItem('StudentIn'));
      const id = storedData.dumID;

      axios.get(`https://academia-api-cu1m.onrender.com/api/students/${id}`).then((studentResponse) => {
        const coursesArray = studentResponse.data.course.split(',').map((course) => course.trim());

        const filteredSubjects = allSubjects.filter((subject) => coursesArray.includes(subject.subject));

        setsubData(filteredSubjects);
      });
    });
  }, []);

  const [rows, setRows] = useState([]);
  const storedData = JSON.parse(localStorage.getItem('StudentIn'));
  const id = storedData.dumID;

  useEffect(() => {
    axios
      .get(`https://academia-api-cu1m.onrender.com/api/students/${id}`)
      .then((response) => {
        setRows(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student data:', error);
      });
  }, [id]);

  const [data, setData] = useState({
    studentname: '',
    email: '',
    Phone: '',
    query: '',
    subject: '',
  });

  useEffect(() => {
    // Populate data when 'rows' changes
    setData({
      studentname: rows.name || '',
      email: rows.email || '',
      Phone: rows.studentmobile || '',
      query: data.query,
      subject: data.subject || '',
    });
  }, [rows, data.query]);

  const handleChange = (e) => {
    e.persist();
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.studentname && data.email && data.Phone && data.query && data.subject) {
      Swal.fire({
        title: 'Do you want to Send the Query?',
        showCancelButton: true,
        confirmButtonText: 'Send',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Query Send..👍', '', 'success');
          axios
            .post('https://academia-api-cu1m.onrender.com/api/studentquery', data)
            .then((response) => {
              console.log('Response:', response);
            })
            .catch((error) => {
              console.error('Error sending query:', error);
            });
        }
      });

      setData({
        query: '',
      });
      props.handleClose();
    } else {
      Swal.fire('Please fill in all fields', '', 'warning');
    }
  };

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null} autoComplete="off">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              select
              value={data.subject || ''}
              variant="filled"
              onChange={handleChange}
              name="subject"
              helperText="Subject"
              SelectProps={{
                native: 'true',
              }}
            >
              {subData.map((val, index) => {
                return (
                  <>
                    <option key={index} value={val.subject}>
                      {val.subject}
                    </option>
                  </>
                );
              })}
            </TextField>
            <TextareaAutosize
              required
              rows="5"
              className="w-100 p-2"
              onChange={handleChange}
              name="query"
              value={data.query || ''}
              placeholder="Enter Your Query..."
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              style={{ display: 'none' }}
              onChange={handleChange}
              name="studentname"
              value={data.studentname || ''}
              label="Student Name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={handleChange}
              style={{ display: 'none' }}
              name="email"
              value={data.email || ''}
              label="Email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onChange={handleChange}
              style={{ display: 'none' }}
              name="Phone"
              value={data.Phone || ''}
              label="Phone"
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} className="mt-3">
          <Grid item xs={6}>
            <Button
              color="error"
              variant="contained"
              type="submit"
              fullWidth
              onClick={() => {
                setData({
                  query: '',
                });
              }}
            >
              <DeleteIcon />
              <span> Clear</span>
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button color="primary" variant="contained" type="submit" fullWidth>
              <SendIcon />
              <span> Send</span>
            </Button>
          </Grid>
        </Grid>
      </ValidatorForm>
    </div>
  );
};

export default StudentQueryForm;
