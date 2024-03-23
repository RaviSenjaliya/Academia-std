// component
import WidgetsIcon from '@mui/icons-material/Widgets';
import EventIcon from '@mui/icons-material/Event';
import PrintIcon from '@mui/icons-material/Print';
import PaymentsIcon from '@mui/icons-material/Payments';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/counsellorDB',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Applicant Profile',
    path: '/dashboard/applicantprofile',
    icon: <PrintIcon />,
  },

  // {
  //   title: 'Order',
  //   path: '/dashboard/order',
  //   icon: <RestaurantMenuIcon />,
  // },

  // -------------------------------------------------------
  {
    title: 'Subject / Time-table',
    path: '/dashboard/subject',
    icon: <NewspaperIcon />,
  },
  {
    title: 'Fees',
    path: '/dashboard/fees',
    icon: <PaymentsIcon />,
  },
  {
    title: 'Event calendar',
    path: '/dashboard/calendar',
    icon: <EventIcon />,
  },
  {
    title: 'Student Query',
    path: '/dashboard/studentquery',
    icon: icon('ic_analytics'),
  },
];

export default navConfig;
