import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_PAY_SUCCESS,
  ORDER_LIST_MY_REQUEST,
  ORDER_LIST_MY_SUCCESS,
  ORDER_LIST_MY_FAIL,
  ORDER_LIST_MY_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET,
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

export const orderCreateReducter = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      }
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      case ORDER_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducter = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DETAILS_RESET:
      return { loading: true, orderItems: [], shippingAddress: {} }
    default:
      return state
  }
}

export const orderPayReducter = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}

export const orderDeliverReducter = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}

export const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_MY_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_MY_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_MY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_LIST_MY_RESET:
      return { orders: [] }
    default:
      return state
  }
}

export const orderListReducter = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        loading: true,
      }
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const orderChildrenReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_CHILDREN_REQUEST:
      return {
        loading: true,
      }
    case ORDER_CHILDREN_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      }
    case ORDER_CHILDREN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const childShippingReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_SHIPPING_ADDRESS_REQUEST:
      return {
        loading: true,
      }
    case CHILD_SHIPPING_ADDRESS_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CHILD_SHIPPING_ADDRESS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const childPayReducer = (state = {}, action) => {
  switch (action.type) {
    case CHILD_PAY_REQUEST:
      return {
        loading: true,
      }
    case CHILD_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case CHILD_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}