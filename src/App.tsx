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

import BloodBankUsers from "./pages/bloodbank/dashboard/Users";
import HospitalUsers from "./pages/hospital/dashboard/Users";

import BloodBankStock from "./pages/bloodbank/dashboard/Stock";
import HospitalStock from "./pages/hospital/dashboard/Stock";

import BloodBankRequests from "./pages/bloodbank/dashboard/Requests";
import HospitalSentRequests from "./pages/hospital/dashboard/BloodRequests";
import HospitalReceivedRequests from "./pages/hospital/dashboard/RecievedRequests";
import { Toaster } from "./components/ui/sonner";
import BloodBags from "./pages/bloodbank/dashboard/BloodBags";
import Applications from "./pages/bloodbank/dashboard/Applications";
import ApplicationDetails from "./pages/bloodbank/dashboard/ApplicationDetails";

/**
 * The main application component that handles routing and navigation for the blood bank and hospital management system.
 *
 * @returns {JSX.Element} - The JSX element representing the application.
 */
export default function App() {
  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/" element={<CreateAccountForHospital />} />
        <Route path="/apply/:applicantId" element={<ApplyForHospital />} />

        <Route path="/hauth" element={(!localStorage.getItem("hospitalAdminToken") && !localStorage.getItem("hospitalWorkerToken")) ? <HospitalAuthLayout /> : <Navigate replace to='/hauth/signin' />}>
          <Route path="" element={<HospitalSignIn />} />
          <Route path="signin" element={(!localStorage.getItem("hospitalAdminToken") && !localStorage.getItem("hospitalWorkerToken")) ? <HospitalSignIn /> : <Navigate replace to='/hauth/signin' />} />
          <Route path="forgotpassword" element={<HospitalForgotPassword />} />
        </Route>

        <Route path="/bauth" element={(!localStorage.getItem("bloodbankAdminToken") && !localStorage.getItem("bloodbankRecorderToken")) ? <BloodBankAuthLayout /> : <Navigate replace to='/dashboard' />}>
          <Route path="" element={<BloodBankSignIn />} />
          <Route path="signin" element={(!localStorage.getItem("bloodbankAdminToken") && !localStorage.getItem("bloodbankRecorderToken")) ? <BloodBankSignIn /> : <Navigate replace to='/dashboard' />} />
          <Route path="forgotpassword" element={<BloodBankForgotPassword />} />
          <Route path="reset-password/:token/:id" element={<ResetPassword />} />
        </Route>

        <Route path="/hauth/:hospitalId" element={(localStorage.getItem("hospitalAdminToken") || localStorage.getItem("hospitalWorkerToken")) ? <HospitalDashboardLayout /> : <Navigate replace to='/hauth/signin' />}>
          <Route path="" element={<HospitalOverview />} />
          <Route path="overview" element={<HospitalOverview />} />
          <Route path="profile" element={<HospitalProfile />} />
          <Route path="settings" element={<HospitalSettings />} />
          <Route path="users" element={<HospitalUsers />} />
          <Route path="stock" element={<HospitalStock />} />
          <Route path="sentrequests" element={<HospitalSentRequests />} />
          <Route path="receivedrequests" element={<HospitalReceivedRequests />} />
        </Route>

        <Route path="dashboard" element={(localStorage.getItem("bloodbankAdminToken") || localStorage.getItem("bloodbankRecorderToken")) ? <BloodBankDashboardLayout /> : <Navigate replace to='/bauth/signin' />}>
          <Route path="" element={<BloodBankOverview />} />
          <Route path="overview" element={<BloodBankOverview />} />
          <Route path="settings" element={<BloodBankSettings />} />
          <Route path="applications" element={<Applications />} />
          <Route path="application/:id/edit" element={<ApplicationDetails />} />
          <Route path="users" element={<BloodBankUsers />} />
          <Route path="stock" element={<BloodBankStock />} />
          <Route path="bags" element={<BloodBags />} />
          <Route path="profile" element={<BloodBankProfile />} />
          <Route path="requests" element={<BloodBankRequests />} />
        </Route>

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate replace to={"/not-found"} />} />
      </Routes>
    </Router>
  )
}
