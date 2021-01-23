import axios from 'axios'
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_CHILDREN_REQUEST,
  ORDER_CHILDREN_SUCCESS,
  ORDER_CHILDREN_FAIL,
  CHILD_SHIPPING_ADDRESS_REQUEST,
  CHILD_SHIPPING_ADDRESS_SUCCESS,
  CHILD_SHIPPING_ADDRESS_FAIL,
  CHILD_PAY_REQUEST,
  CHILD_PAY_SUCCESS,
  CHILD_PAY_FAIL,
} from '../types/orderTypes'
import {
  CART_CLEAR,
}from '../types/cartTypes'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.post('/api/orders', order, config)

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    })
    dispatch({
      type: CART_CLEAR,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.get('/api/orders/' + id, config)

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    console.log(userInfo.token)

    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config)

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.get(`/api/orders`, config)

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_MY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.get(`/api/orders/me`, config)

    dispatch({
      type: ORDER_LIST_MY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const listChildrenOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CHILDREN_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    const { data } = await axios.get(`/api/orders/child`, config)

    dispatch({
      type: ORDER_CHILDREN_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: ORDER_CHILDREN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const childShippingAddress = (id, shippingInfo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHILD_SHIPPING_ADDRESS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    console.log(userInfo.token)

    const { data } = await axios.put(`/api/orders/${id}/shipping`, shippingInfo, config)

    dispatch({
      type: CHILD_SHIPPING_ADDRESS_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHILD_SHIPPING_ADDRESS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}

export const childPaymentMethod = (id, paymentMethod) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHILD_PAY_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: 'Bearer ' + userInfo.token,
      },
    }

    console.log(userInfo.token)

    const { data } = await axios.put(`/api/orders/${id}/paymentMethod`, paymentMethod, config)

    dispatch({
      type: CHILD_PAY_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CHILD_PAY_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    })
  }
}