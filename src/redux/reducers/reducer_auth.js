import { toast } from "react-toastify";
import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGOUT_USER,
    SET_LOGGED_USER,
    GET_LOGIN_STATE
  } from '../constants';
  
  
  const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
    loggedIn: false,
  };
  
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case GET_LOGIN_STATE:
        return { ...state, loading: true };
      case SET_LOGGED_USER:
        return { ...state, loggedIn: true, loading: false, user: action.payload };
      case EMAIL_CHANGED:
        return { ...state, email: action.payload };
      case PASSWORD_CHANGED:
        return { ...state, password: action.payload };
      case LOGIN_USER:
        return { ...state, loading: true, error: '' };
      case LOGIN_USER_SUCCESS:
      console.log('USER: ', action.payload)
        toast.success('Login successful');
        return { ...state, ...INITIAL_STATE, user: action.payload, loggedIn: true };
      case LOGIN_USER_FAIL:
        toast.error(action.error);
        return { ...state, ...INITIAL_STATE, error: action.error };
      case LOGOUT_USER:
      toast.success('So long, bitch');
        return { ...state, ...INITIAL_STATE };
      default:
        return state;
    }
  };