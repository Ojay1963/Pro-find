import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FaCheckCircle, FaTimesCircle, FaEnvelope, FaSpinner } from 'react-icons/fa';
import { storage } from '../utils/localStorage';
import toast from 'react-hot-toast';

export default function EmailVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [resendStatus, setResendStatus] = useState('idle'); // idle, sending, sent

  useEffect(() => {
    if (token && email) {
      // In a real app, this would verify the token with the backend
      // For now, we'll simulate verification
      setTimeout(() => {
        const users = storage.getUsers();
        const user = users.find(u => u.email === email);
        if (user) {
          storage.updateUser(user.id, { emailVerified: true, verifiedAt: new Date().toISOString() });
          setStatus('success');
          toast.success('Email verified successfully!');
        } else {
          setStatus('error');
        }
      }, 1500);
    } else {
      setStatus('error');
    }
  }, [token, email]);

  const handleResendVerification = () => {
    setResendStatus('sending');
    // In a real app, this would send a verification email
    setTimeout(() => {
      setResendStatus('sent');
      toast.success('Verification email sent! Check your inbox.');
      setTimeout(() => setResendStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-20 mt-24">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 text-center">
            {status === 'verifying' && (
              <>
                <FaSpinner className="text-6xl text-blue-600 mx-auto mb-4 animate-spin" />
                <h1 className="text-2xl font-bold mb-2">Verifying Email</h1>
                <p className="text-gray-600">Please wait while we verify your email address...</p>
              </>
            )}

            {status === 'success' && (
              <>
                <FaCheckCircle className="text-6xl text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
                <p className="text-gray-600 mb-6">Your email address has been successfully verified.</p>
                <Link
                  to="/dashboard"
                  className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                >
                  Go to Dashboard
                </Link>
              </>
            )}

            {status === 'error' && (
              <>
                <FaTimesCircle className="text-6xl text-red-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
                <p className="text-gray-600 mb-6">
                  The verification link is invalid or has expired. Please request a new verification email.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleResendVerification}
                    disabled={resendStatus === 'sending' || resendStatus === 'sent'}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {resendStatus === 'sending' && <FaSpinner className="animate-spin" />}
                    {resendStatus === 'sent' && <FaCheckCircle />}
                    {resendStatus === 'sending' ? 'Sending...' : resendStatus === 'sent' ? 'Email Sent!' : 'Resend Verification Email'}
                  </button>
                  <Link
                    to="/"
                    className="block text-center text-green-600 hover:underline"
                  >
                    Go to Homepage
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Email Verification Info */}
          <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="flex items-start gap-3">
              <FaEnvelope className="text-blue-600 text-xl mt-1" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Why verify your email?</p>
                <ul className="list-disc list-inside space-y-1 text-blue-800">
                  <li>Secure your account</li>
                  <li>Receive important notifications</li>
                  <li>Get price alerts and updates</li>
                  <li>Reset your password if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
