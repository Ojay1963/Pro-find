import React from 'react';
import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App';

const storageMock = vi.hoisted(() => ({
  cleanupFloorPlans: vi.fn(),
  syncAll: vi.fn().mockResolvedValue(undefined),
  getCurrentUser: vi.fn(),
  logout: vi.fn()
}));

vi.mock('../utils/localStorage', () => ({
  storage: storageMock
}));

vi.mock('../contexts/SearchContext.jsx', () => ({
  SearchProvider: ({ children }) => <>{children}</>
}));

vi.mock('../components/ScrollToTop', () => ({
  default: () => null
}));
vi.mock('../components/ScrollProgress', () => ({
  default: () => null
}));
vi.mock('../components/BackToTop', () => ({
  default: () => null
}));
vi.mock('../components/GlobalTips', () => ({
  default: () => null
}));

vi.mock('../pages/HomePage', () => ({
  default: () => <h1 data-testid="page-home">Home</h1>
}));
vi.mock('../pages/Register', () => ({
  default: () => <h1 data-testid="page-register">Register</h1>
}));
vi.mock('../pages/Login', () => ({
  default: () => <h1 data-testid="page-login">Login</h1>
}));
vi.mock('../pages/ResetPassword', () => ({
  default: () => <h1 data-testid="page-reset-password">Reset Password</h1>
}));
vi.mock('../pages/ResetPasswordCheckEmail', () => ({
  default: () => <h1 data-testid="page-reset-password-check-email">Reset Password Check Email</h1>
}));
vi.mock('../pages/InquirySuccess', () => ({
  default: () => <h1 data-testid="page-inquiry-success">Inquiry Success</h1>
}));
vi.mock('../pages/RegistrationSuccess', () => ({
  default: () => <h1 data-testid="page-registration-success">Registration Success</h1>
}));
vi.mock('../pages/Dashboard', () => ({
  default: () => <h1 data-testid="page-dashboard">Dashboard</h1>
}));
vi.mock('../pages/CreateListing', () => ({
  default: () => <h1 data-testid="page-create-listing">Create Listing</h1>
}));
vi.mock('../pages/Properties', () => ({
  default: () => <h1 data-testid="page-properties">Properties</h1>
}));
vi.mock('../pages/PropertiesMap', () => ({
  default: () => <h1 data-testid="page-properties-map">Properties Map</h1>
}));
vi.mock('../pages/About', () => ({
  default: () => <h1 data-testid="page-about">About</h1>
}));
vi.mock('../pages/ServicesPage', () => ({
  default: () => <h1 data-testid="page-services">Services</h1>
}));
vi.mock('../pages/PropertyDetails', () => ({
  default: () => <h1 data-testid="page-property-details">Property Details</h1>
}));
vi.mock('../pages/ContactPage', () => ({
  default: () => <h1 data-testid="page-contact">Contact</h1>
}));
vi.mock('../pages/AdminPanel', () => ({
  default: () => <h1 data-testid="page-admin">Admin Panel</h1>
}));
vi.mock('../pages/CompareProperties', () => ({
  default: () => <h1 data-testid="page-compare">Compare Properties</h1>
}));
vi.mock('../pages/AgentProfile', () => ({
  default: () => <h1 data-testid="page-agent-profile">Agent Profile</h1>
}));
vi.mock('../pages/Messages', () => ({
  default: () => <h1 data-testid="page-messages">Messages</h1>
}));
vi.mock('../pages/BulkUpload', () => ({
  default: () => <h1 data-testid="page-bulk-upload">Bulk Upload</h1>
}));

vi.mock('react-hot-toast', () => ({
  default: { error: vi.fn(), success: vi.fn() },
  Toaster: () => null
}));

const renderAt = (path) => {
  window.history.pushState({}, '', path);
  return render(<App />);
};

describe('app smoke tests', () => {
  beforeEach(() => {
    localStorage.clear();
    storageMock.getCurrentUser.mockReset();
    storageMock.getCurrentUser.mockReturnValue(null);
  });

  it('renders public home route', async () => {
    renderAt('/');
    expect(await screen.findByTestId('page-home')).toBeInTheDocument();
  });

  it('renders public login route', async () => {
    renderAt('/login');
    expect(await screen.findByTestId('page-login')).toBeInTheDocument();
  });

  it('renders reset password check email route', async () => {
    renderAt('/reset-password/check-email');
    expect(await screen.findByTestId('page-reset-password-check-email')).toBeInTheDocument();
  });

  it('renders inquiry success route', async () => {
    renderAt('/inquiry/success');
    expect(await screen.findByTestId('page-inquiry-success')).toBeInTheDocument();
  });

  it('redirects unauthenticated users from dashboard to login', async () => {
    renderAt('/dashboard');
    expect(await screen.findByTestId('page-login')).toBeInTheDocument();
  });

  it('allows authenticated users to access dashboard', async () => {
    storageMock.getCurrentUser.mockReturnValue({ id: 1, role: 'seeker' });

    renderAt('/dashboard');
    expect(await screen.findByTestId('page-dashboard')).toBeInTheDocument();
  });

  it('redirects non-admin users away from admin route', async () => {
    storageMock.getCurrentUser.mockReturnValue({ id: 1, role: 'seeker' });

    renderAt('/admin');
    expect(await screen.findByTestId('page-dashboard')).toBeInTheDocument();
  });

  it('allows admin users to access admin route', async () => {
    storageMock.getCurrentUser.mockReturnValue({ id: 1, role: 'admin' });

    renderAt('/admin');
    expect(await screen.findByTestId('page-admin')).toBeInTheDocument();
  });
});
