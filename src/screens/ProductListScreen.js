import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../redux/actions/productActions'

import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

function ProductListScreen({ history, match }) {
  const dispatch = useDispatch()

  const { loading, error, products } = useSelector(({ productList }) => productList)
  const { userInfo } = useSelector(({ userLogin }) => userLogin)

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) history.push('/login')
    dispatch(listProducts())
  }, [dispatch, history, userInfo])

  const deleteHandler = (id) => {
    // if (window.confirm('Are you sure?')) dispatch(deleteUser(id))
  }
  const createHandler = (product) => {}

  return (
    <>
      <Row className='align-item-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createHandler}>
            <i className='fas fa-plus'></i> Create product
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link to={`/admin/products/${product._id}/edit`}>
                    <Button variant='light' size='sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </Link>
                  <Button variant='danger' size='sm' onClick={() => deleteHandler(product._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
