import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";

import CreateAccountForHospital from "./pages/hospital/CreateAccountForHospital";
import ApplyForHospital from "./pages/ApplyForHospital";
import NotFound from "./pages/NotFound";

import HospitalAuthLayout from "./pages/hospital/auth/HospitalAuthLayout";
import BloodBankAuthLayout from "./pages/bloodbank/auth/BloodBankAuthLayout";

import HospitalDashboardLayout from "./pages/hospital/dashboard/HospitalDashboardLayout";
import BloodBankDashboardLayout from "./pages/bloodbank/dashboard/BloodBankDashboardLayout";

import HospitalSignIn from "./pages/hospital/auth/SignIn";
import BloodBankSignIn from "./pages/bloodbank/auth/SignIn";

import HospitalForgotPassword from "./pages/hospital/auth/ForgotPassword";
import BloodBankForgotPassword from "./pages/bloodbank/auth/ForgotPassword";

import ResetPassword from "./pages/bloodbank/auth/ResetPassword";

import HospitalProfile from "./pages/hospital/dashboard/Profile";
import BloodBankProfile from "./pages/bloodbank/dashboard/Profile";

import BloodBankSettings from "./pages/bloodbank/dashboard/Settings";
import HospitalSettings from "./pages/hospital/dashboard/Settings";

import HospitalOverview from "./pages/hospital/dashboard/Overview";
import BloodBankOverview from "./pages/bloodbank/dashboard/Overview";

import BloodBankUsers from "./pages/bloodbank/dashboard/users/Users";
import BloodBankAddUser from "./pages/bloodbank/dashboard/users/AddUser";
import BloodBankUpdateUser from "./pages/bloodbank/dashboard/users/UpdateUser";

import HospitalUsers from "./pages/hospital/dashboard/Users";

import BloodBankStock from "./pages/bloodbank/dashboard/Stock";
import HospitalStock from "./pages/hospital/dashboard/Stock";

import BloodBankRequests from "./pages/bloodbank/dashboard/Requests";
import HospitalSentRequests from "./pages/hospital/dashboard/BloodRequests";
import HospitalReceivedRequests from "./pages/hospital/dashboard/RecievedRequests";
import BloodBags from "./pages/bloodbank/dashboard/bloodBags/BloodBags";
import Applications from "./pages/bloodbank/dashboard/Applications";
import ApplicationDetails from "./pages/bloodbank/dashboard/ApplicationDetails";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";
import AddNewBloodbag from "./pages/bloodbank/dashboard/bloodBags/AddNewBloodBag";
import UpdateBloodbag from "./pages/bloodbank/dashboard/bloodBags/UpdateBloodBag";

/**
 * The main application component that handles routing and navigation for the blood bank and hospital management system.
 *
 * @returns {JSX.Element} - The JSX element representing the application.
 */
export default function App() {
  const isAdminToken = localStorage.getItem("bloodbankAdminToken");
  const isBloodBankRecorderToken = localStorage.getItem("bloodbankRecorderToken");
  const isHospitalAdminToken = localStorage.getItem("hospitalAdminToken");
  const isHospitalWorkerToken = localStorage.getItem("hospitalWorkerToken");

  return (
    <Router>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Toaster position="top-right" richColors />
        <Routes>
          <Route path="/" element={<CreateAccountForHospital />} />
          <Route path="/apply/:applicantId" element={<ApplyForHospital />} />

          <Route path="/hauth" element={(!isHospitalAdminToken && !isHospitalWorkerToken) ? <HospitalAuthLayout /> : <Navigate replace to='/hauth/signin' />}>
            <Route path="" element={<HospitalSignIn />} />
            <Route path="signin" element={(!isHospitalAdminToken && !isHospitalWorkerToken) ? <HospitalSignIn /> : <Navigate replace to='/hauth/signin' />} />
            <Route path="forgotpassword" element={<HospitalForgotPassword />} />
          </Route>

          <Route path="/bauth" element={(!isAdminToken && !isBloodBankRecorderToken) ? <BloodBankAuthLayout /> : <Navigate replace to={`/dashboard/${isAdminToken ? 'a' : 'r'}`} />}>
            <Route path="" element={<BloodBankSignIn />} />
            <Route path="signin" element={(!isAdminToken && !isBloodBankRecorderToken) ? <BloodBankSignIn /> : <Navigate replace to={`/dashboard/${isAdminToken ? 'a' : 'r'}`} />} />
            <Route path="forgotpassword" element={<BloodBankForgotPassword />} />
            <Route path="reset-password/:token/:id" element={<ResetPassword />} />
          </Route>

          <Route
            path="/hdash/:hospitalId/:userType"
            element={
              (isHospitalAdminToken || isHospitalWorkerToken)
                ? <HospitalDashboardLayout />
                : <Navigate replace to='/hauth/signin' />
            }
          >
            <Route path="" element={<HospitalOverview />} />
            <Route path="overview" element={<HospitalOverview />} />
            <Route path="profile" element={<HospitalProfile />} />
            <Route path="settings" element={<HospitalSettings />} />
            <Route path="users" element={<HospitalUsers />} />
            <Route path="stock" element={<HospitalStock />} />
            <Route path="sentrequests" element={<HospitalSentRequests />} />
            <Route path="receivedrequests" element={<HospitalReceivedRequests />} />
          </Route>

          <Route
            path="dashboard/:userType"
            element={
              (isAdminToken || isBloodBankRecorderToken)
                ? <BloodBankDashboardLayout />
                : <Navigate replace to='/bauth/signin' />
            }
          >
            <Route path="" element={<BloodBankOverview />} />
            <Route path="overview" element={<BloodBankOverview />} />
            <Route path="settings" element={<BloodBankSettings />} />
            <Route path="applications" element={<Applications />} />
            <Route path="application/:id/edit" element={<ApplicationDetails />} />
            <Route path="users" element={<BloodBankUsers />} />
            <Route path="users/new" element={<BloodBankAddUser />} />
            <Route path="users/:userId" element={<BloodBankUpdateUser />} />
            <Route path="stock" element={<BloodBankStock />} />
            <Route path="bags" element={<BloodBags />} />
            <Route path="bags/add" element={<AddNewBloodbag />} />
            <Route path="bags/:bagId" element={<UpdateBloodbag />} />
            <Route path="profile" element={<BloodBankProfile />} />
            <Route path="requests" element={<BloodBankRequests />} />
          </Route>

          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to={"/not-found"} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}
