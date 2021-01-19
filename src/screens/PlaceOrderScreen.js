import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../redux/actions/orderActions'

import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import { getParentDetails } from '../redux/actions/userActions'

function PlaceOrderScreen({ history }) {
  const dispatch = useDispatch()
  const cart = useSelector(({ cart }) => cart)
  const { userInfo } = useSelector(state => state.userLogin)
  const { parent } = useSelector(state => state.parentInfo)

  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2)

  // Calculate price
  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  cart.shippingPrice = addDecimals(cart.itemsPrice > 500 ? 0 : 10)
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
  cart.totalPrice = addDecimals(
    Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
  )

  const { success, error, order } = useSelector(({ orderCreate }) => orderCreate)

  useEffect(() => {
    if (success) history.push('/order/' + order._id)
    dispatch(getParentDetails())
  }, [history, success, order, userInfo, dispatch])

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
        parent: parent?._id,
      })
    )
    localStorage.removeItem("cartItems")
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            {
              Boolean(!userInfo?.parent) ? (
                <>
                  <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p>
                      <strong>Address: </strong>
                      {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                      {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <h2>Payment method</h2>
                    <p>
                      <strong>Method: </strong>
                      {cart.paymentMethod}
                    </p>
                  </ListGroup.Item>
                </>
              ) : 
              (
                <ListGroup.Item>
                  <h2>Redirect order to</h2>
                  <p>
                    <strong>Parent: </strong>
                    {parent.name}
                  </p>
                </ListGroup.Item>
              )
            }

            <ListGroup.Item>
              <h2>Order items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, i) => (
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
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  {Number(cart.shippingPrice) === 0 ? (
                    <Col>Free</Col>
                  ) : (
                    <Col>${cart.shippingPrice}</Col>
                  )}
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {error && (
                <ListGroup.Item>
                  <Message variant='danger'>{error}</Message>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  type='button'
                  block
                  disabled={cart.cartItems === 0}
                  onClick={placeOrderHandler}
                >
                  {userInfo?.parent ? 'Request Order' : 'Place Order'}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen