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


/* export const signupUser = (newUserData) => {
  const { userEmail, userPassword, userDisplayName, userIsTeacher } = newUserData
  return (dispatch) => {
    dispatch({
      type: SIGNUP_USER,
    })
    auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(
        success => {
          auth.onAuthStateChanged((user) => {
            if (user) {
              // Update user Profile
              user.updateProfile({
                displayName: userDisplayName,
              }).then(success => {
                // Update successful.
                console.log('Update success ...')
                // send verification email
                user.sendEmailVerification()
                .then(success => {
                  // Send Email success.
                  console.log('Email success ...')
                  signupUserSuccess(dispatch, user);
                }).catch(error => {
                  // Send Email error.
                  console.log('Email error ...')
                  signupUserFail(dispatch, error.message);
                });
              }).catch(error => {
                // Update error.
                console.log('Update error ...')
                signupUserFail(dispatch, error.message);
              });
              
            }
            else {
              console.log('NO USER ...')
              // ..... NO USER
            }

          })

        },
        // User creation error
        error => {
          signupUserFail(dispatch, error.message);
        }
      )
  }
} */


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
                    signupUserSuccess(dispatch, user)
                  },
                  error => {
                    // USER UPDATE ERROR
                    signupUserFail(dispatch, error.message);
                  }
                )
            })
            .catch(error => {
              // SEND EMAIL ERROR
              signupUserFail(dispatch, error.message);
            })
        },
        error => {
          // CREATE USER ERROR
          signupUserFail(dispatch, error.message);
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


const signupUserSuccess = (dispatch, user) => {
  console.log('**************************')
  console.log(dispatch, user)
  console.log('**************************')
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  })
};

const signupUserFail = (dispatch, error) => {
  console.log('**************************')
  console.log(dispatch, error)
  console.log('**************************')
  //dispatch(reset('signupForm', 'userEmail'), { 
  //dispatch(change('signupForm', 'userPassword', ''), { 
  dispatch({
    type: SIGNUP_USER_FAIL,
    error: error
  })
};