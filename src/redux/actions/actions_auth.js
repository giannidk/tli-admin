import { database, auth, usersRoot } from '../../app/config';

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
} from '../constants';


export const setLoggedInState = (user) => {
  return (dispatch) => {
    dispatch(
      {
        type: SET_LOGGED_USER,
        payload: user
      }
    );
  }
}

export const getLoggedInState = () => {
  return (dispatch) => {
    dispatch({ type: GET_LOGIN_STATE });
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log('USER!!!!!!');
        dispatch(
          {
            type: SET_LOGGED_USER,
            payload: user
          }
        );
      }
      else {
        console.log('NO USER');
        dispatch({
          type: LOGOUT_USER
        });
      }

    });
  }
}




export const signupUser = (user) => {
  const { email, password, isTeacher } = user
  return (dispatch) => {
    dispatch({
      type: SIGNUP_USER,
    })
    auth.createUserWithEmailAndPassword(email, password)
      .then(
        success => {
          // the user is created
          const newUserRoot = `${usersRoot}/${success.user.uid}`
          // insert user in users path
          database.ref(newUserRoot)
            .set({ isTeacher })
            .then(
              () => {
                // if user is saved in path, check for log in change and return to reducer
                auth.onAuthStateChanged(currentUser => {
                  if (currentUser) {
                    console.log('CURRENT USER: ', currentUser)
                    dispatch({
                      type: SIGNUP_USER_SUCCESS,
                      payload: currentUser
                    })
                  }
                })
              },
              error => {
                dispatch({
                  type: SIGNUP_USER_FAIL,
                  error: error.message
                });
              }
            )
        },
        error => {
          console.log(error)
          dispatch({
            type: SIGNUP_USER_FAIL,
            error: error.message
          });
        }
      )
  }
}





export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};



export const loginUser = ({ email, password }, callback) => {
  console.log(email, password)
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    auth.signInWithEmailAndPassword(email, password)
      .then(
        user => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
          });
          callback();
        },
        error => {
          console.log(error.message);
          dispatch({
            type: LOGIN_USER_FAIL,
            error: error.message
          });
        }
      )
  }
}

export const logoutUser = (callback) => {
  console.log('LOGOUT FROM ACTION');
  return (dispatch) => {
    auth.signOut();
    dispatch({
      type: LOGOUT_USER
    });
    callback();
  };
};