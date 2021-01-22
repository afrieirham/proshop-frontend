import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { cartReducer } from './reducers/cartReducers'
import {
  productTopRatedReducer,
  productDetailsReducer,
  productListReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
} from './reducers/productReducers'
import {
  orderCreateReducter,
  orderDetailsReducter,
  orderPayReducter,
  orderDeliverReducter,
  orderListMyReducer,
  orderListReducter,
  orderChildrenReducer
} from './reducers/orderReducers'
import {
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userUpdateReducer,
  userParentDetailsReducer,
  userRegisterChildReducer,
  userInviteChildReducer,
  userChildrenDetailsReducer,
} from './reducers/userReducers'
import { USER_LOGOUT } from './types/userTypes'

const appReducer = combineReducers({
  productTopRated: productTopRatedReducer,
  productList: productListReducer,
  productUpdate: productUpdateReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  orderList: orderListReducter,
  orderCreate: orderCreateReducter,
  orderDetails: orderDetailsReducter,
  orderDeliver: orderDeliverReducter,
  orderPay: orderPayReducter,
  orderListMy: orderListMyReducer,
  orderChildren: orderChildrenReducer,
  userUpdate: userUpdateReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userLogin: userLoginReducer,
  parentInfo: userParentDetailsReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userRegisterChild : userRegisterChildReducer,
  userInviteChild: userInviteChildReducer,
  userChildrenDetails : userChildrenDetailsReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : null

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
}
const middleware = [thunk]

// Reset redux state when user logout
const reducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    state = undefined
  }
  return appReducer(state, action)
}

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
