import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile , inviteChild } from '../redux/actions/userActions'
import { listMyOrders } from '../redux/actions/orderActions'

import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProfileScreen({ location, history }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [childName, setChildName] = useState('')
  const [childEmail, setChildEmail] = useState('')


  const dispatch = useDispatch()

  const { loading, user } = useSelector(({ userDetails }) => userDetails)
  const { userInfo } = useSelector(({ userLogin }) => userLogin)
  const { success, error } = useSelector(({ userUpdateProfile }) => userUpdateProfile)
  const { success:successInviteChild, error:errorInviteChild } = useSelector(({ userInviteChild }) => userInviteChild)
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
    ({ orderListMy }) => orderListMy
  )

  useEffect(() => {
    if (!userInfo) history.push('/login')

    dispatch(listMyOrders())
  
    if (!user?.name) {
      dispatch(getUserDetails('profile'))
    } else {
      setName(user.name)
      setEmail(user.email)
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) return setMessage('Password do not match')

    dispatch(
      updateUserProfile({
        id: user._id,
        name,
        email,
        password,
      })
    )
  }

  const submitChildHandler = (e) => {
    e.preventDefault()

    dispatch(
      inviteChild(
        childName,
        childEmail,
      )
    )
  }
  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>
          {message && <Message variant='danger'>{message}</Message>}
          {error && <Message variant='danger'>{error}</Message>}
          {success && <Message variant='success'>Profile updated</Message>}
          {successInviteChild && <Message variant='success'>Child account created</Message>}
          {errorInviteChild && <Message variant='danger'>{errorInviteChild}</Message>}
          {loading && <Loader variant='danger' />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update profile
            </Button>
          </Form>

          {!user?.parent && 
            <Form onSubmit={submitChildHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Child Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter children name'
                onChange={(e) => setChildName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email children address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter children email'
                onChange={(e) => setChildEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Add Children
            </Button>
            </Form>
          }


        </Col>
        <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders && <Loader />}
          {errorOrders && <Message variant='danger'>{errorOrders}</Message>}
          {(orders === undefined || orders.length === 0) && (
            <Message>
              You haven't bought anything yet. <Link to='/'>Buy something now.</Link>
            </Message>
          )}
          {orders !== undefined && orders.length > 0 && (
            <Table striped bordered hover responsive className='table-sm'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th>Detail</th>
                </tr>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <Link to={'/order/' + order._id}>
                        <Button size='sm' variant='light'>
                          <i className='fas fa-arrow-right'></i>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </>
  )
}

export default ProfileScreen
