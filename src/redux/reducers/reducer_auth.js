import { toast } from "react-toastify";
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,

  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGOUT_USER,
  SET_LOGGED_USER,
  GET_LOGIN_STATE,

  FETCH_USER,
} from '../constants';


const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: false,
  user: null,
};


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {


    
    case SIGNUP_USER:
      return { ...state, loading: true };
    case SIGNUP_USER_SUCCESS:
      toast.success('Login successful');
      return { ...state, ...INITIAL_STATE };
    case SIGNUP_USER_FAIL:
      toast.error(action.error);
      return { ...state, ...INITIAL_STATE, error: action.error };


    case GET_LOGIN_STATE:
      return { ...state, loading: true };
    case SET_LOGGED_USER:
      return { ...state, loading: false, user: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      toast.success('Login successful');
      return { ...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      toast.error(action.error);
      return { ...state, ...INITIAL_STATE, error: action.error };
    case LOGOUT_USER:
      toast.success('So long, bitch');
      return { ...state, ...INITIAL_STATE };


    case FETCH_USER:
      return { ...state, loading: false, user: action.payload };


    default:
      return state;
  }
};