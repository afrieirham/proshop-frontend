import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from '@stripe/react-stripe-js';
import { getOrderDetails, payOrder, deliverOrder, childShippingAddress, childPaymentMethod } from '../redux/actions/orderActions'

import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../redux/types/orderTypes'
import moment from 'moment'

import { Row, Col, ListGroup, Image, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getParentDetails } from '../redux/actions/userActions'
import StripePay from '../components/StripePay'

function OrderScreen({ match, history }) {
  const dispatch = useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const { loading, error, order } = useSelector(({ orderDetails }) => orderDetails)
  const [paymentMethod, setPaymentMethod] = useState('PayPal')
  const [paypalPaymentChecked, setPaypalPaymentChecked] = useState(true)
  const [stripePaymentChecked, setStripePaymentChecked] = useState(false)

  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')

  const orderId = match.params.id
  const { userInfo } = useSelector(({ userLogin }) => userLogin)
  const { parent } = useSelector((state) => state.parentInfo)
  const { loading: loadingPay, success: successPay } = useSelector(({ orderPay }) => orderPay)
  const { loading: loadingDeliver, success: successDeliver } = useSelector(
    ({ orderDeliver }) => orderDeliver
  )
  const { loading: loadingChildShip, success: successChildShip } = useSelector(({ childShipping }) => childShipping)
  const { loading: loadingChildPaymentMethod, success: successChildPaymentMethod } = useSelector(({ childPay }) => childPay)

  const PUBLIC_KEY = "pk_test_51IB1RoJW8nAYHWxGy9DOOJNU7iVDMlmPB14iGTiA8koN62PZ568s7XcI1io6VMqcy1md5THU0PAlP6XFxaw1MxTJ00ZrPZXufd";
  const stripeTestPromise = loadStripe(PUBLIC_KEY);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      const addPayPalScript = async () => {
        const { data } = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'https://www.paypal.com/sdk/js?client-id=' + data.clientId
        script.asycn = true
        script.onload = () => setSdkReady(true)
        document.body.appendChild(script)
      }

      if (!order || successPay || successDeliver ) {
        dispatch({ type: ORDER_DELIVER_RESET })
        dispatch({ type: ORDER_PAY_RESET })
        dispatch(getOrderDetails(orderId))
      } else {
        if (!userInfo.isAdmin && userInfo._id !== order.parent && userInfo._id !== order.user._id) {
          history.push('/login')
        } else {
          !order.isPaid && !window.paypal ? addPayPalScript() : setSdkReady(true)
        }
      }
    }
  }, [orderId, dispatch, successPay, successDeliver, order, userInfo, history])

  useEffect(() => {
    dispatch(getParentDetails())
  }, [dispatch])

  useEffect(() => {
    if(successChildShip || successChildPaymentMethod) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, successChildShip, orderId, successChildPaymentMethod])

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))
    dispatch(childPaymentMethod(orderId, {paymentMethod}))
  }

  const deliverHandler = (id) => {
    dispatch(deliverOrder(id))
  }

  const shippingSubmitHandler = (e) => {
    e.preventDefault()
      dispatch(childShippingAddress(orderId, { shippingInfo: {address, city, postalCode, country }}))
  }

  const setChildPaymentMethod = (paymentMethod) => {
    setPaypalPaymentChecked(!paypalPaymentChecked);
    setStripePaymentChecked(!stripePaymentChecked);
    setPaymentMethod(paymentMethod);
  }  

  if (loading) return <Loader />
  if (error) return <Message variant='danger'>{error}</Message>

  if(userInfo._id === order.parent) {
    return (
      <>
        <h1>Order {order._id}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Shipping</h2>
                {order.isDelivered ? (
                  <Message variant='success'>Delivered on {moment(order.deliveredAt).format("D MMM YYYY")}</Message>
                ) : (
                  <Message variant='danger'>Not delivered</Message>
                )}
                {loadingChildShip && <Loader />}
                {order.shippingAddress ? (
                  <>
                <p>
                  <strong>Name:</strong> {userInfo.name}
                </p>
                <p>
                <strong>Email:</strong>{' '}
                <a href={'mailto:' + order.user.email}>{userInfo.email}</a>
              </p>
              <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            </>
                ) : (
                  <Form onSubmit={shippingSubmitHandler}>
                  <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter address'
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter city'
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter postal code'
                      value={postalCode}
                      onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      placeholder='Enter country'
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type='submit' variant='primary'>
                    Save
                  </Button>
                </Form>
                )}
              </ListGroup.Item>
              {order.shippingAddress &&
              <ListGroup.Item>
              <h2>Payment method</h2>
              {order.isPaid ? (
                <Message variant='success'>Paid on {moment(order.paidAt).format("D MMM YYYY")}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
              {loadingChildPaymentMethod && <Loader />}
              {order.isPaid ? (
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              ) : (
                <Form>
                <Form.Group>
                  <Form.Label as='legend'>Select method</Form.Label>
                  <Col>
                    <Form.Check
                      type='radio'
                      label='PayPal or Credit Card'
                      id='PayPal'
                      name='paymentMethod'
                      value='PayPal'
                      checked={paypalPaymentChecked}
                      onChange={(e) => setChildPaymentMethod(e.target.value)}
                    ></Form.Check>

                    <Form.Check
                      type='radio'
                      label='Stripe'
                      id='Stripe'
                      name='paymentMethod'
                      value='Stripe'
                      checked={stripePaymentChecked}
                      onChange={(e) => setChildPaymentMethod(e.target.value)}
                    ></Form.Check>
                  </Col>
                </Form.Group>
              </Form>
              )}
            </ListGroup.Item>}
              <ListGroup.Item>
                <h2>Order items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, i) => (
                      <ListGroup.Item key={i}>
                        <Row>
                          <Col md={1}>
                            <Image src={item.image} alt={item.name} fluid rounded />
                          </Col>
                          <Col>
                            <Link to={'/product/' + item.product}>{item.name}</Link>
                          </Col>
                          <Col md={4}>
                            <p>
                              {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                            </p>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    {Number(order.shippingPrice) === 0 ? (
                      <Col>Free</Col>
                    ) : (
                      <Col>${order.shippingPrice.toFixed(2)}</Col>
                    )}
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>${order.totalPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {order.shippingAddress && <>
                  {userInfo && userInfo._id === order.parent && !order.isPaid && paymentMethod === 'PayPal' && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
                  </ListGroup.Item>
                )}
                {userInfo && userInfo._id === order.parent && !order.isPaid && paymentMethod === 'Stripe' && (
                  <ListGroup.Item>
                  <Elements stripe={stripeTestPromise}>
                  <StripePay email={order.user.email} orderId={orderId}/>
                </Elements>
                </ListGroup.Item>
                )}
                </>}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <Loader />}
                    <Button block onClick={() => deliverHandler(order._id)}>
                      Mark as delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    )
  }

  return (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              {order.isDelivered ? (
                <Message variant='success'>Delivered on {moment(order.deliveredAt).format("D MMM YYYY")}</Message>
              ) : (
                <Message variant='danger'>Not delivered</Message>
              )}
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href={'mailto:' + order.user.email}>{order.user.email}</a>
              </p>
              {order.shippingAddress &&
                (<p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                  {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                </p>
                )
              }
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment method</h2>
              {order.isPaid ? (
                <Message variant='success'>Paid on {moment(order.paidAt).format("D MMM YYYY")}</Message>
              ) : (
                <Message variant='danger'>Not paid</Message>
              )}
              <p>
                <strong>Method: </strong>
                {parent ? 'Paid by parent' : order.paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, i) => (
                    <ListGroup.Item key={i}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={'/product/' + item.product}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          <p>
                            {item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}
                          </p>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {Number(order.shippingPrice) === 0 ? (
                    <Col>Free</Col>
                  ) : (
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {userInfo && userInfo._id === order.user._id && !order.isPaid && order.paymentMethod === 'PayPal' && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                  )}
                </ListGroup.Item>
              )}
              {userInfo && userInfo._id === order.user._id && !order.isPaid && order.paymentMethod === 'Stripe' && (
                <ListGroup.Item>
                <Elements stripe={stripeTestPromise}>
                <StripePay email={order.user.email} orderId={orderId}/>
              </Elements>
              </ListGroup.Item>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <ListGroup.Item>
                  {loadingDeliver && <Loader />}
                  <Button block onClick={() => deliverHandler(order._id)}>
                    Mark as delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
