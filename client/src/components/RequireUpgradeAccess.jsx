import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { storage } from '../utils/localStorage'

const allowedRoles = new Set(['agent', 'owner'])

const RequireUpgradeAccess = ({ children }) => {
  const location = useLocation()
  const user = storage.getCurrentUser()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.has(user.role)) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default RequireUpgradeAccess
