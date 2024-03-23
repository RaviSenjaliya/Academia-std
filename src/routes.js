import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import P404 from './pages/P404';
import Registrationpage from './pages/Registrationpage';
import DashboardAppPage from './pages/DashboardAppPage';
import Syllabus from './pages/Syllabus';
import StudentQuery from './pages/StudentQuery';
import Calendar from './pages/Calendar';
import Category from './pages/Category';
import Table from './pages/Table';
// import LinaerStepper from './pages/LinaerStepper';
import Fees from './pages/Fees';
import RequireAuth from './pages/RequireAuth';
import ApplicantProfile from './pages/ApplicantProfile';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <RequireAuth>
          <DashboardLayout />
        </RequireAuth>
      ),
      children: [
        {
          element: <Navigate to="/dashboard/counsellorDB" />,
          index: true,
        },
        { path: 'counsellorDB', element: <DashboardAppPage /> },
        { path: 'fees', element: <Fees /> },
        // { path: 'order', element: <LinaerStepper /> },
        { path: 'studentquery', element: <StudentQuery /> },
        { path: 'subject', element: <Syllabus /> },
        { path: 'calendar', element: <Calendar /> },
        { path: 'applicantprofile', element: <ApplicantProfile /> },
      ],
    },

    {
      path: 'login',
      element: <LoginPage />,
    },
    // {
    //   path: 'registration',
    //   element: <Registrationpage />,
    // },
    // ----------------------------------------------

    // {
    //   path: 'Table',
    //   element: <Table />,
    // },

    // ----------------------------------------------
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <P404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
