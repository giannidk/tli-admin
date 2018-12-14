import { database, auth, usersRoot } from '../../app/config'
import {
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_FAIL,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  FETCH_USER,
  LOGOUT_USER,
} from '../types'


export const signupUser = (user) => {
  const { userEmail, userPassword, displayName, isTeacher } = user
  return (dispatch) => {
    dispatch({
      type: SIGNUP_USER,
    })
    auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(
        success => {
          const user = auth.currentUser
          user.sendEmailVerification()
            .then(() => {
              // the user is created and the activation email is sent.
              // insert user in users path
              const newUserRoot = `${usersRoot}/${success.user.uid}`
              database.ref(newUserRoot)
                .set({ isTeacher: isTeacher || false })
                .then(
                  () => {
                    dispatch({
                      type: SIGNUP_USER_SUCCESS,
                      payload: success.user
                    })
                  },
                  error => {
                    dispatch({
                      type: SIGNUP_USER_FAIL,
                      error: error.message
                    })
                  }
                )
            })
            .catch(error => {
              // An error happened.
              dispatch({
                type: SIGNUP_USER_FAIL,
                error: error.message
              })
            })



        },
        error => {
          dispatch({
            type: SIGNUP_USER_FAIL,
            error: error.message
          })
        }
      )
  }
}

export const loginUser = (email, password) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })
    auth.signInWithEmailAndPassword(email, password)
      .then(
        success => {
          dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: success.user
          })
        },
        error => {
          dispatch({
            type: LOGIN_USER_FAIL,
            error: error.message
          })
        }
      )
  }
}

export const fetchUser = () => {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          {
            type: FETCH_USER,
            payload: user,
          }
        )
      }
      else {
        dispatch({
          type: FETCH_USER,
          payload: null,
        })
      }

    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    auth.signOut()
    dispatch({
      type: LOGOUT_USER
    })
  }
}