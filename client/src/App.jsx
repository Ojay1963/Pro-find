import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'

import ScrollToTop from './components/ScrollToTop';

import { SearchProvider } from './contexts/SearchContext.jsx';
import { storage } from './utils/localStorage';

import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import GlobalTips from './components/GlobalTips';
import RequireAuth from './components/RequireAuth';
import RequireAdmin from './components/RequireAdmin';
import RequireUpgradeAccess from './components/RequireUpgradeAccess';

const HomePage = React.lazy(() => import('./pages/HomePage'))
const Register = React.lazy(() => import('./pages/Register'))
const Login = React.lazy(() => import('./pages/Login'))
const RegistrationSuccess = React.lazy(() => import('./pages/RegistrationSuccess'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const CreateListing = React.lazy(() => import('./pages/CreateListing'))
const Properties = React.lazy(() => import('./pages/Properties'))
const PropertiesMap = React.lazy(() => import('./pages/PropertiesMap'))
const About = React.lazy(() => import('./pages/About'))
const ServicesPage = React.lazy(() => import('./pages/ServicesPage'))
const PropertyDetails = React.lazy(() => import('./pages/PropertyDetails'))
const ContactPage = React.lazy(() => import('./pages/ContactPage'))
const AdminPanel = React.lazy(() => import('./pages/AdminPanel'))
const CompareProperties = React.lazy(() => import('./pages/CompareProperties'))
const AgentProfile = React.lazy(() => import('./pages/AgentProfile'))
const Messages = React.lazy(() => import('./pages/Messages'))
const BulkUpload = React.lazy(() => import('./pages/BulkUpload'))
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'))
const Upgrade = React.lazy(() => import('./pages/Upgrade'))

const buildAppUrl = (path) => {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '')
  return `${base}${path.startsWith('/') ? path : `/${path}`}` || '/'
}

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
          window.location.assign(buildAppUrl('/login'));
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
        <Suspense fallback={<RouteLoader />}>
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
            <Route path="/upgrade" element={<RequireUpgradeAccess><Upgrade /></RequireUpgradeAccess>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <GlobalTips />
      {!hideBackToTop && <BackToTop />}
      <Toaster position="top-right" />
    </div>
  )
}

function RouteLoader() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-center text-gray-600">
      Loading...
    </div>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Page Not Found</h1>
      <p className="mt-3 text-gray-600">The page you requested does not exist.</p>
      <Link to="/" className="mt-6 inline-block rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">
        Go Home
      </Link>
    </div>
  )
}

export default App
