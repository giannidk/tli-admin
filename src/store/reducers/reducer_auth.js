import { toast } from "react-toastify";
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  FETCH_USER,
  LOGOUT_USER,
} from '../types';


const INITIAL_STATE = {
  signupError: '',
  loginError: '',
  loading: false,
  user: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP_USER:
      return { ...state, loading: true, signupError: '' };
    case SIGNUP_USER_SUCCESS:
      //toast.success('Your profile has been created successfully');
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case SIGNUP_USER_FAIL:
      //toast.error(action.error);
      return { ...state, ...INITIAL_STATE, signupError: action.error };
    case LOGIN_USER:
      return { ...state, loading: true, loginError: '' };
    case LOGIN_USER_SUCCESS:
      toast.success('Login successful');
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      //toast.error(action.error); // using the toaster will allow to remove loginError form the store
      return { ...state, ...INITIAL_STATE, loginError: action.error };
    case FETCH_USER:
      return { ...state, loading: false, user: action.payload };
    case LOGOUT_USER:
      toast.info('You are now logged out');
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};