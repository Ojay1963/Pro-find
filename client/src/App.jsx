import React from 'react'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop';

import { SearchProvider } from './contexts/SearchContext.jsx';
import { storage } from './utils/localStorage';

import HomePage from './pages/HomePage'
import Register from './pages/Register'
import Login from './pages/Login'
import RegistrationSuccess from './pages/RegistrationSuccess'
import Dashboard from './pages/Dashboard'
import CreateListing from './pages/CreateListing'
import Properties from './pages/Properties'
import PropertiesMap from './pages/PropertiesMap'
import About from './pages/About'
import ServicesPage from './pages/ServicesPage'
import PropertyDetails from './pages/PropertyDetails';
import ContactPage from './pages/ContactPage';
import AdminPanel from './pages/AdminPanel';
import CompareProperties from './pages/CompareProperties';
import AgentProfile from './pages/AgentProfile';
import Messages from './pages/Messages';
import BulkUpload from './pages/BulkUpload';
import ResetPassword from './pages/ResetPassword';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import GlobalTips from './components/GlobalTips';
import RequireAuth from './components/RequireAuth';
import RequireAdmin from './components/RequireAdmin';

function App() {
  React.useEffect(() => {
    storage.cleanupFloorPlans();
    void storage.syncAll();
  }, []);

  React.useEffect(() => {
    const idleLimitMs = 2 * 60 * 1000; // 2 minutes
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    let didExpire = false;

    const markActivity = () => {
      localStorage.setItem('profind_last_active', String(Date.now()));
    };

    const checkIdle = () => {
      const userId = localStorage.getItem('profind_user_id');
      if (!userId) return;
      const lastActive = Number(localStorage.getItem('profind_last_active') || Date.now());
      if (Date.now() - lastActive > idleLimitMs) {
        if (didExpire) return;
        didExpire = true;
        toast.error('Session expired due to inactivity.');
        void storage.logout();
        setTimeout(() => {
          window.location.href = '/login';
        }, 800);
      }
    };

    activityEvents.forEach((event) => window.addEventListener(event, markActivity));
    const interval = setInterval(checkIdle, 10 * 1000);
    markActivity();

    return () => {
      activityEvents.forEach((event) => window.removeEventListener(event, markActivity));
      clearInterval(interval);
    };
  }, []);

  return (
    <SearchProvider>
      <Router basename={import.meta.env.BASE_URL}>
        <ScrollToTop />

        <AppShell />
      </Router>
    </SearchProvider>
  )
}

function AppShell() {
  const location = useLocation()
  const hideBackToTop = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollProgress />
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/registration-success" element={<RegistrationSuccess />} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/create-listing" element={<RequireAuth><CreateListing /></RequireAuth>} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/map" element={<PropertiesMap />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<RequireAdmin><AdminPanel /></RequireAdmin>} />
          <Route path="/compare" element={<RequireAuth><CompareProperties /></RequireAuth>} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/messages" element={<RequireAuth><Messages /></RequireAuth>} />
          <Route path="/messages/:conversationId" element={<RequireAuth><Messages /></RequireAuth>} />
          <Route path="/bulk-upload" element={<RequireAdmin><BulkUpload /></RequireAdmin>} />
        </Routes>
      </main>
      <GlobalTips />
      {!hideBackToTop && <BackToTop />}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
