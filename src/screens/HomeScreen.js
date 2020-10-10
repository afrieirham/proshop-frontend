import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions'

import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Meta from '../components/Meta'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen({ match }) {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const { loading, error, products, page, pages } = useSelector(({ productList }) => productList)

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <>
      <Meta />

      {!keyword ? (
        <>
          <h1>Featured Products</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>{keyword ? 'Search results' : 'Latest products'}</h1>
      {products.length === 0 && <Message>No products found</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </>
      )}
    </>
  )
}

export default HomeScreen
