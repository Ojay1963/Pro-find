import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { storage } from '../utils/localStorage'

const RequireAuth = ({ children }) => {
  const location = useLocation()
  const user = storage.getCurrentUser()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return children
}

export default RequireAuth
