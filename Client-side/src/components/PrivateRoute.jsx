import React from 'react'

import { useSelector } from 'react-redux'

import { Navigate ,Outlet } from 'react-router-dom'

// /outlet acts as a placeholder to render child props here in this case it is rendering <dashboard/>

const PrivateRoute = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    currentUser ? <Outlet /> : <Navigate to="/sign-in"  />

  )
}

export default PrivateRoute