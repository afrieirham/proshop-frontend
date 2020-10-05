import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts, deleteProduct, createProduct } from '../redux/actions/productActions'
import { PRODUCT_CREATE_RESET } from '../redux/types/productTypes'

import { Table, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'

function ProductListScreen({ history, match }) {
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  const { loading, error, products, page, pages } = useSelector(({ productList }) => productList)
  const { userInfo } = useSelector(({ userLogin }) => userLogin)
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = useSelector(
    ({ productDelete }) => productDelete
  )

  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = useSelector(({ productCreate }) => productCreate)

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })
    if (!userInfo || !userInfo.isAdmin) history.push('/login')
    if (successCreate) history.push(`/admin/products/${createdProduct._id}/edit`)
    dispatch(listProducts('', pageNumber))
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) dispatch(deleteProduct(id))
  }
  const createHandler = () => {
    dispatch(createProduct())
  }

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
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
          <Paginate pages={pages} page={page} isAdmin />
        </>
      )}
    </>
  )
}

export default ProductListScreen
