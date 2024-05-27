import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Card, Stepper, Step, Container, StepLabel, Button, Grid, styled } from '@mui/material';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import axios from 'axios';
import Soundd from './paytm_payment_tune.mp3';
import payment from './succsfully__registred.gif';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));

const steps = ['Step1', 'Step 2', 'Step 3'];

function Paymentgateway(props) {
  const storedData = JSON.parse(localStorage.getItem('StudentIn'));
  const id = storedData.id;

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    Sname: '',
    studentmobile: '',
    email: '',
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
    totamt: '',
    feesid: id,
  });

  const handleNext = (e) => {
    if (activeStep === steps.length - 1) {
      if (window.confirm('Are you sure you want to Submit?')) {
        axios.post('https://academia-api-cu1m.onrender.com/api/fees', formData).then((r) => {
          console.log(r);
        });
        new Audio(Soundd).play();
      }
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setFormData((e.target.value = ''));
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

              <TextField
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
              <TextField
                type="number"
                name="studentmobile"
                id="standard-basic"
                onFocus={handleInputFocus}
                value={formData.studentmobile}
                onChange={handleChange}
                errorMessages={[
                  'this field is required',
                  'The phone number must be 10 digits',
                  'The phone number must be 10 digits',
                ]}
                label=" Mobile No "
                validators={['required', 'maxStringLength: 10', 'minStringLength: 10']}
              />
              <TextField
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

      case 1: {
        const fees = storedData.fees;
        const totalFees = fees;
        let totalSubAmt = 0;

        props.rows.forEach((val) => {
          const subAmt = parseInt(val.totamt, 10);

          totalSubAmt += subAmt;
        });

        const cal = totalFees - totalSubAmt;
        const total = cal - formData.totamt;

        return (
          <>
            <div style={{ border: '5px solid #ff6666' }} className="p-3 rounded-3">
              <h6 className="d-flex align-items-center justify-content-between mb-3">
                Total fees: <span>{cal}</span>
              </h6>
              <h6 className="d-flex align-items-center justify-content-between mb-3">
                Current payment: <span style={{ backgroundColor: '#ff66662b' }}> {formData.totamt} </span>
              </h6>
              <div className="checkout__total">
                <h5 className="d-flex align-items-center justify-content-between">
                  Remaining fees: <span>{total}</span>
                </h5>
              </div>
              <small style={{ color: 'red' }}>
                {/* {formData.totamt > 95000 ? 'Input values greater than 95000..🙄' : ''} */}
              </small>
            </div>
            <TextField
              type="number"
              className="my-3"
              label="Amount"
              name="totamt"
              value={formData.totamt}
              onChange={handleChange}
              validators={['required', 'minNumber:1', `maxNumber:${cal}`]}
              errorMessages={[
                'This field is required',
                'value not correct please check total fees....👆',
                'value not correct please check total fees....👆',
              ]}
            />
          </>
        );
      }
      case 2:
        return (
          <div>
            <Cards
              number={formData.number}
              expiry={formData.expiry}
              cvc={formData.cvc}
              name={formData.name}
              focused={formData.focus}
            />
            <TextField
              className="my-3"
              type="number"
              name="number"
              id="standard-basic"
              value={formData.number}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={[
                'this field is required',
                'The card number must be 16 digits',
                'The card number must be 16 digits',
              ]}
              label=" Card Number "
              validators={['required', 'maxStringLength: 16', 'minStringLength: 16']}
            />
            <TextField
              type="number"
              name="expiry"
              id="standard-basic"
              value={formData.expiry}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={[
                'this field is required',
                'The card number must be 4 digits',
                'The card number must be 4 digits',
              ]}
              label=" Card expiry "
              validators={['required', 'maxStringLength: 4', 'minStringLength: 4']}
            />
            <TextField
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
            <TextField
              type="number"
              name="cvc"
              id="standard-basic"
              value={formData.cvc}
              onChange={handleChange}
              onFocus={handleInputFocus}
              errorMessages={[
                'this field is required',
                'The card number must be 3 digits',
                'The card number must be 3 digits',
              ]}
              label=" Card cvv "
              validators={['required', 'maxStringLength: 3', 'minStringLength: 3']}
            />
          </div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Container>
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
              <>
                <div className="justify-content-center text-center d-flex">
                  <img src={payment} alt="payment" />
                </div>
                <h2>Your payment is confirmed!</h2>
              </>
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
      </Container>
    </>
  );
}

export default Paymentgateway;
