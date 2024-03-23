import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Button, Drawer, Typography, Avatar } from '@mui/material';
import Swal from 'sweetalert2';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../components/logo';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const myNav = useNavigate();

  const [session, setSession] = useState({ session: 0 });
  const [countdown, setCountdown] = useState(0); // Initialize countdown to 0

  useEffect(() => {
    let timeout;
    axios
      .get('https://tender-duck-pantsuit.cyclic.app/api/session')
      .then((response) => {
        const sessionData = response.data;
        setSession(sessionData);
        const sessionValue = sessionData && sessionData.length > 0 ? sessionData[0].session : undefined;
        const countdownValue = sessionValue ? sessionValue * 60 : 20 * 60; // Default 20 minutes if sessionValue is undefined
        setCountdown(countdownValue);

        // If sessionValue arrives after 20 seconds, update countdown with the received sessionValue
        if (!sessionValue) {
          timeout = setTimeout(() => {
            setCountdown(20 * 60); // Set default countdown of 20 minutes
          }, 20000); // 20 seconds delay
        }
      })
      .catch((error) => {
        console.error('Error fetching session data:', error);
      });

    return () => {
      clearTimeout(timeout); // Clear timeout on component unmount
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(timer);
        // Swal.fire({
        //   title: 'your session has expired. please log in',
        //   confirmButtonText: 'Ok',
        // }).then((result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //     // localStorage.removeItem('StudentIn');
        //     // myNav('/login');
        //   }
        // });
      }
    }, 1000);

    // useEffect(() => {
    //   setTimeout(() => {
    //     localStorage.removeItem('StudentIn');
    //     myNav('/login');
    //   }, 20 * 60 * 1000);
    // }, []);

    return () => clearInterval(timer);
  }, [countdown, myNav]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const { pathname } = useLocation();
  const isDesktop = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <Box sx={{ px: 2.5, pt: 3, pb: 1, display: 'inline-flex' }}>
        <Logo />
      </Box>

      <Box sx={{ mb: 4, mx: 2.5 }}>
        <Link underline="none">
          <StyledAccount>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                {account.displayName}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {account.role}
              </Typography>
            </Box>
          </StyledAccount>
        </Link>
      </Box>
      <p className="text-center text-white " style={{ background: '#ff5050', fontSize: 14 }}>
        Time remaining: {formatTime(countdown)} minutes
      </p>
      <NavSection data={navConfig} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
