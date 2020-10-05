import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import { listProducts } from '../redux/actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen({ match }) {
  const keyword = match.params.keyword

  const dispatch = useDispatch()

  const { loading, error, products } = useSelector(({ productList }) => productList)

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
      <h1>Latest products</h1>
      {products.length === 0 && <Message>No products found</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
