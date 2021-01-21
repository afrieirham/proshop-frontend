import React, { useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

function GuestRoute({ ...rest }) {
  const history = useHistory()
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.userLogin)
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    // Redirect user to homescreen if logged in
    if (userInfo) {
      return history.push(redirect)
    }
  }, [location, history, userInfo, redirect])

  return <Route {...rest} />
}

export default GuestRoute
