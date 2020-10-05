import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listTopProducts } from '../redux/actions/productActions'

import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'

function ProductCarousel() {
  const dispatch = useDispatch()
  const { loading, error, products } = useSelector(({ productTopRated }) => productTopRated)

  useEffect(() => {
    dispatch(listTopProducts())
  }, [dispatch])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} fluid alt={product.name} />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel
