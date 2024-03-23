import axios from 'axios';
import { useEffect, useState } from 'react';
// @mui
import { Box, List, Badge, Divider, Popover, Typography, IconButton, ListSubheader } from '@mui/material';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const [data, setdata] = useState([]);
  const [open, setOpen] = useState(null);

  useEffect(() => {
    axios.get('https://tender-duck-pantsuit.cyclic.app/api/notifications').then((r) => {
      setdata(r.data);
    });
  }, []);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const unseenNotifications = data.filter((notification) => !notification.seen);

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        {unseenNotifications.length > 0 && (
          <Badge badgeContent={unseenNotifications.length} color="error">
            <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
          </Badge>
        )}
        {unseenNotifications.length === 0 && <Iconify width={24} icon="solar:bell-bing-bold-duotone" />}
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          {data.map((val, index) => {
            return (
              <div key={index}>
                <List
                  key={index}
                  style={{ backgroundColor: '#cadaf480' }}
                  className="my-2 rounded-3 p-2 m-3"
                  disablePadding
                  subheader={
                    <ListSubheader
                      style={{ fontSize: 14, color: '#212B36' }}
                      disableSticky
                      sx={{ py: 1, px: 2.5, typography: 'overline' }}
                    >
                      {val.name} :
                    </ListSubheader>
                  }
                >
                  <ListSubheader
                    style={{ fontSize: 12 }}
                    disableSticky
                    sx={{ py: 0.6, px: 4.0, typography: 'overline' }}
                  >
                    {val.notice}
                  </ListSubheader>
                </List>
              </div>
            );
          })}
        </Scrollbar>
      </Popover>
    </>
  );
}
