import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
// @mui

import { Stack, IconButton, InputAdornment, styled, Button } from '@mui/material';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

// components
import { toast } from 'react-toastify';
import Iconify from '../../components/iconify';

const TextField = styled(TextValidator)(() => ({
  width: '100%',
  marginBottom: '16px',
}));
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  const [data, setdata] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('https://lime-reindeer-boot.cyclic.app/api/studentSignIn', data)
      .then((y) => {
        localStorage.setItem('StudentIn', JSON.stringify(y.data));
        toast('login successfully');
        navigate('/dashboard/counsellorDB');
        window.location.reload();

        const studentData = JSON.parse(localStorage.getItem('StudentIn'));
        const studentName = (studentData && studentData.name) || 'John Doe';
        const message = new SpeechSynthesisUtterance(`${studentName} Welcome to Academia`);
        window.speechSynthesis.speak(message);
      })
      .catch((y) => {
        toast('Invalid Username/Password');
      });
  };

  return (
    <>
      <Stack spacing={3}>
        <ValidatorForm onSubmit={handleSubmit} onError={() => null} autocomplete="off">
          <TextField
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            errorMessages={['this field is required']}
            validators={['required']}
            label="Email address"
          />

          <TextField
            name="password"
            label="Password"
            value={data.password || ''}
            onChange={handleChange}
            errorMessages={['this field is required']}
            validators={['required']}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button fullWidth size="large" type="submit" variant="contained">
            Login
          </Button>
        </ValidatorForm>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link>Forgot password?</Link>
      </Stack>
    </>
  );
}
