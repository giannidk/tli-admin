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
      .then(
        userCreateSuccess => {
          // The user is created, now I will update the user data
          const { currentUser } = auth
          currentUser.updateProfile({
            displayName: userDisplayName,
          })
            .then(
              userUpdateSuccess => {
                // User update success, now I update data in other tables
                const newUserRoot = `${usersRoot}/${currentUser.uid}`
                const newTeacherRoot = `${teachersRoot}/TEST/${currentUser.uid}`
                database.ref(newUserRoot)
                  .set({ isTeacher: userIsTeacher || false })
                  .then(
                    tablesUpdateSuccess => {
                      // Users table updated successfully, now I update the teachers table if needed, and I send the activation email
                      // Save if teacher ------------------------------------
                      if (userIsTeacher) {
                        database.ref(newTeacherRoot).set({ name: userDisplayName })
                          .then(() => { return })
                          .catch(teacherSaveError => signupUserFail(dispatch, teacherSaveError.message, callbackFunction))
                      }
                      // End save if teacher ________________________

                      // Now I send the activation email
                      currentUser.sendEmailVerification()
                        .then(
                          verificationEmailSuccess => signupUserSuccess(dispatch, currentUser, callbackFunction),
                          verificationEmailError => signupUserFail(dispatch, verificationEmailError.message, callbackFunction)
                        )
                    },
                    tablesUpdateError => signupUserFail(dispatch, tablesUpdateError.message, callbackFunction)
                  )
              },
              userUpdateError => signupUserFail(dispatch, userUpdateError.message, callbackFunction)
            )
        },
        userCreateError => signupUserFail(dispatch, userCreateError.message, callbackFunction)
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


const signupUserSuccess = (dispatch, user, callbackFunction) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  })
  callbackFunction()
};

const signupUserFail = (dispatch, error, callbackFunction) => {
  //dispatch(reset('signupForm', 'userEmail'), { 
  //dispatch(change('signupForm', 'userPassword', ''), { 
  dispatch({
    type: SIGNUP_USER_FAIL,
    error: error
  })
  callbackFunction()
};