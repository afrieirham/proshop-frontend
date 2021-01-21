import React, { useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GuestRoute({ ...rest }) {
  const history = useHistory()
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    // Redirect user to homescreen if logged in
    if (userInfo) {
      return history.push('/')
    }
  }, [location, history, userInfo,])

  return <Route {...rest} />
}

export default GuestRoute
