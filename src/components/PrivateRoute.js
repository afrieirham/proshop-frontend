import React, { useEffect } from 'react'
import { Route, useHistory, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/actions/userActions'

function PrivateRoute({ admin, ...rest }) {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { userInfo } = useSelector((state) => state.userLogin)

  useEffect(() => {
    // Kick user to login screen if not logged in
    if (!userInfo) {
      dispatch(logout())
      return history.push('/login')
    }

    // Kick user to homescreen if not admin
    if (admin && !userInfo.isAdmin) {
      return history.push('/')
    }
  }, [dispatch, location, history, userInfo, admin])

  return <Route {...rest} />
}

export default PrivateRoute
