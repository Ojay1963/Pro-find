import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import Header from '../components/Header'
import Footer from '../components/Footer'

const RegistrationSuccess = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-xl shadow-sm p-8 space-y-6">
            <div className="flex justify-center">
              <div className="bg-green-100 rounded-full p-4">
                <FaCheckCircle className="text-6xl text-green-600" />
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h1>
              <p className="text-gray-600 mb-2">
                Your account has been created successfully. Welcome to PROFIND!
              </p>
              <p className="text-sm text-blue-600">
                Please check your email to verify your account.
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Sign In Now
              </button>
              
              <Link
                to="/"
                className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Go to Homepage
              </Link>
            </div>

            <p className="text-sm text-gray-500 pt-4">
              You can now browse properties, save favorites, and contact agents.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default RegistrationSuccess
