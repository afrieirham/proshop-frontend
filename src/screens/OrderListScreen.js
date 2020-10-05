import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listOrders } from '../redux/actions/orderActions'

import { Link } from 'react-router-dom'
import { Button, Table } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProfileScreen({ location, history }) {
  const dispatch = useDispatch()

  const { userInfo } = useSelector(({ userLogin }) => userLogin)
  const { orders, loading: loadingOrders, error: errorOrders } = useSelector(
    ({ orderList }) => orderList
  )

  useEffect(() => {
    if (!userInfo) history.push('/login')
    dispatch(listOrders())
  }, [dispatch, history, userInfo])

  return (
    <>
      <h1>My Orders</h1>
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
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Detail</th>
            </tr>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
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
    </>
  )
}

export default ProfileScreen
