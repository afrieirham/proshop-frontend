import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Form, Button } from 'react-bootstrap'

function SearchBox() {
  const history = useHistory()
  const location = useLocation()

  const [keyword, setKeyword] = useState('')
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push('/search/' + keyword)
    } else {
      history.push('/')
    }
  }

  useEffect(() => {
    if (!location.pathname.includes('search')) {
      setKeyword('')
    }
  }, [location.pathname])

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search product...'
        className='mr-sm-2 ml-sm-5'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type='submit' variant='outline-light' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
