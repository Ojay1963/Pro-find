import React from 'react'
import { Toaster } from 'react-hot-toast';
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
import EmailVerification from './pages/EmailVerification';
import Messages from './pages/Messages';
import BulkUpload from './pages/BulkUpload';
import ResetPassword from './pages/ResetPassword';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import GlobalTips from './components/GlobalTips';

function App() {
  React.useEffect(() => {
    storage.cleanupFloorPlans();
  }, []);

  return (
    <SearchProvider>
      <Router>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/map" element={<PropertiesMap />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/compare" element={<CompareProperties />} />
          <Route path="/agent/:id" element={<AgentProfile />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/messages/:conversationId" element={<Messages />} />
          <Route path="/bulk-upload" element={<BulkUpload />} />
        </Routes>
      </main>
      <GlobalTips />
      {!hideBackToTop && <BackToTop />}
      <Toaster position="top-right" />
    </div>
  )
}

export default App
