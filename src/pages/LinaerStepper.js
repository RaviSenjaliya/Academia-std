import React, { useState } from 'react';
import Swal from 'sweetalert2';
import {
  Card,
  Stepper,
  Step,
  Stack,
  Typography,
  Container,
  StepLabel,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  MenuItem,
  Radio,
  RadioGroup,
  TextareaAutosize,
  styled,
} from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const steps = ['Step111', 'Step 2', 'Step 3'];

function StepForm() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    Sname: '',
    studentmobile: '',
    email: '',
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: true,
  });

  const handleNext = (e) => {
    if (activeStep === steps.length - 1) {
      Swal.fire({
        title: 'Do you want to Submit ?',
        showCancelButton: true,
        confirmButtonText: 'Submit',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          e.preventDefault();
          // --------------------------API----------------------------
          // axios.post('http://localhost:9999/api/inquiry', data).then((r) => {
          //   console.log(r.data);
          // });
          console.log(formData);

          setActiveStep((prevActiveStep) => prevActiveStep + 1);
          setFormData((e.target.value = ''));
        }
      });
      console.log(formData);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleInputFocus = (evt) => {
    setFormData((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={8}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
              <h4 className=" p-2 rounded-2 mb-3" style={{ backgroundColor: '#e8f0fe' }}>
                Student Details
              </h4>

              <TextValidator
                className="mb-3"
                fullWidth
                type="text"
                name="Sname"
                id="standard-basic"
                onFocus={handleInputFocus}
                value={formData.Sname}
                onChange={handleChange}
                errorMessages={['this field is required']}
                label="Student Name "
                validators={['required']}
              />
              <TextValidator
                className="mb-3"
                fullWidth
                type="number"
                name="studentmobile"
                id="standard-basic"
                onFocus={handleInputFocus}
                value={formData.studentmobile}
                onChange={handleChange}
                errorMessages={['this field is required']}
                label=" Mobile No "
                validators={['required']}
              />
              <TextValidator
                className="mb-3"
                fullWidth
                type="email"
                name="email"
                id="standard-basic"
                onFocus={handleInputFocus}
                value={formData.email}
                onChange={handleChange}
                errorMessages={['this field is required']}
                label=" Email "
                validators={['required']}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <div>
            <Cards
              number={formData.number}
              expiry={formData.expiry}
              cvc={formData.cvc}
              name={formData.name}
              focused={formData.focus}
            />
            <TextValidator
              className="mb-3"
              fullWidth
              type="number"
              name="number"
              id="standard-basic"
              value={formData.number}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={['this field is required']}
              label=" Card Number "
              validators={['required']}
            />
            <TextValidator
              className="mb-3"
              fullWidth
              type="number"
              name="expiry"
              id="standard-basic"
              value={formData.expiry}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={['this field is required']}
              label=" Card expiry "
              validators={['required']}
            />
            <TextValidator
              className="mb-3"
              fullWidth
              type="text"
              name="name"
              id="standard-basic"
              value={formData.name}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={['this field is required']}
              label=" Card Holder Name "
              validators={['required']}
            />
            <TextValidator
              className="mb-3"
              fullWidth
              type="number"
              name="cvc"
              id="standard-basic"
              value={formData.cvc}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={['this field is required']}
              label=" Card cvc "
              validators={['required']}
            />
          </div>
        );
      case 2:
        return (
          <TextValidator
            fullWidth
            label="Step 3"
            name="step3"
            value={formData.step3}
            onChange={handleChange}
            validators={['required']}
            errorMessages={['This field is required']}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Menu
          </Typography>
        </Stack>

        <Card
          style={{ height: '100%', width: '100%', backgroundColor: '#ffffff', padding: '80px 40px 40px 40px' }}
          sx={{ boxShadow: 3, borderRadius: '16px' }}
        >
          <ValidatorForm onSubmit={handleNext} instantValidate={false}>
            <Stepper activeStep={activeStep} alternativeLabel className="mb-4">
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <div>
              {activeStep === steps.length ? (
                <div>
                  <h2>thank you...😁</h2>
                  <Button variant="contained" color="primary" onClick={() => setActiveStep(0)}>
                    Reset
                  </Button>
                </div>
              ) : (
                <div>
                  {getStepContent(activeStep)}
                  <div style={{ marginTop: '1rem' }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </ValidatorForm>
        </Card>
      </Container>
    </>
  );
}

export default StepForm;
