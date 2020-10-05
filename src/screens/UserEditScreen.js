import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUser } from '../redux/actions/userActions'
import { USER_UPDATE_RESET } from '../redux/types/userTypes'

import { Form, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'

function UserEditScreen({ match, history }) {
  const userId = match.params.id

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, user } = useSelector(({ userDetails }) => userDetails)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(
    ({ userUpdate }) => userUpdate
  )

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/users')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, successUpdate, history])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      })
    )
  }
  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        {!error && !loading && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='text'
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

            <Form.Group controlId='isAdmin'>
              <Form.Check
                label='Is admin?'
                type='checkbox'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
