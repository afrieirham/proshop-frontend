import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_PARENT_DETAILS_REQUEST,
  USER_PARENT_DETAILS_FAIL,
  USER_PARENT_DETAILS_SUCCESS,
  USER_REGISTER_CHILD_REQUEST,
  USER_REGISTER_CHILD_SUCCESS,
  USER_REGISTER_CHILD_FAIL,
  USER_INVITE_CHILD_REQUEST,
  USER_INVITE_CHILD_SUCCESS,
  USER_INVITE_CHILD_FAIL,
  USER_SHOW_CHILD_REQUEST,
  USER_SHOW_CHILD_SUCCESS,
  USER_SHOW_CHILD_FAIL,
} from '../types/userTypes'

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
      }
    case USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_DETAILS_SUCCESS:
      return {
        loading: false,
        user: action.payload,
      }
    case USER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userParentDetailsReducer = (state = { parent: {} }, action) => {
  switch (action.type) {
    case USER_PARENT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_PARENT_DETAILS_SUCCESS:
      return {
        loading: false,
        parent: action.payload,
      }
    case USER_PARENT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        success: true,
        user: action.payload,
      }
    case USER_UPDATE_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        users: action.payload,
      }
    case USER_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_LIST_RESET:
      return {
        users: [],
      }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return {
        loading: true,
      }
    case USER_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const userRegisterChildReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_CHILD_REQUEST:
      return {
        loading: true,
      }
    case USER_REGISTER_CHILD_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      }
    case USER_REGISTER_CHILD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userInviteChildReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_INVITE_CHILD_REQUEST:
      return {
        loading: true,
      }
    case USER_INVITE_CHILD_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        success: true,
      }
    case USER_INVITE_CHILD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const userChildrenDetailsReducer = (state = { children: {} }, action) => {
  switch (action.type) {
    case USER_SHOW_CHILD_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case USER_SHOW_CHILD_SUCCESS:
      return {
        loading: false,
        children: action.payload,
      }
    case USER_SHOW_CHILD_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}
