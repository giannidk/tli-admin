import { database, auth, usersRoot, teachersRoot } from '../../app/config'
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


export const signupUser = (user, callbackFunction) => {
  const { userEmail, userPassword, userDisplayName, userIsTeacher } = user
  return (dispatch) => {
    dispatch({
      type: SIGNUP_USER,
    })
    auth.createUserWithEmailAndPassword(userEmail, userPassword)
      .then(() => {
        // THE USER IS CREATED
        const { currentUser } = auth
        currentUser.updateProfile({
          displayName: userDisplayName,
        })
          .then(() => {
            // USER UPDATED SUCCESSFULLY 
            const newUserRoot = `${usersRoot}/${currentUser.uid}`
            const newTeacherRoot = `${teachersRoot}/TEST/${currentUser.uid}`
            database.ref(newUserRoot)
              .set({ isTeacher: userIsTeacher || false })
              .then(
                () => {
                  // USER SET IN USER TABLE 
                  // Save if teacher ------------------------------------
                  if (userIsTeacher) {
                    database.ref(newTeacherRoot).set({ name: userDisplayName })
                      .then(() => { return })
                      .catch(teacherSaveError => signupUserFail(dispatch, teacherSaveError.message))
                  }
                  // End save if teacher ________________________

                  // Send Activation Email
                  currentUser.sendEmailVerification()
                    .then(() => { return })
                    .catch(activationMailSendingError => signupUserFail(dispatch, activationMailSendingError.message))
                },
                userTableWritingError => signupUserFail(dispatch, userTableWritingError.message)
              )
                signupUserSuccess(dispatch, currentUser)
                callbackFunction()
          })
          .catch(userUpdateError => signupUserFail(dispatch, userUpdateError.message))
      },
        userCreateError => signupUserFail(dispatch, userCreateError.message)
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
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  })
};

const signupUserFail = (dispatch, error) => {
  //dispatch(reset('signupForm', 'userEmail'), { 
  //dispatch(change('signupForm', 'userPassword', ''), { 
  dispatch({
    type: SIGNUP_USER_FAIL,
    error: error
  })
};