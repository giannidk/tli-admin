import { makeShortDate } from '../../helpers';
import {
  database,
  calendarRoot,
  TMP_USER,
  registrationsRoot as regsRoot,
  projectsRegistrationsRoot as projectsRegsRoot
} from '../../app/config';

import {
    CALENDAR_ENTRY_ADD,
    CALENDAR_ENTRY_ADD_SUCCESS,
    CALENDAR_ENTRY_ADD_ERROR,
} from '../constants';

export function addQuickbookEntry(values) {
	return (dispatch) => {
    database.ref(`${calendarRoot}/${TMP_USER}`)
    .push(values)
    .then(
        success => {
            dispatch({
                type: CALENDAR_ENTRY_ADD_SUCCESS,
                payload: `Your lesson has been booked: ${success.getKey()}`
            });
        },
        error => {
            dispatch({
                type: CALENDAR_ENTRY_ADD_ERROR,
                payload: error.code, //"An error has occurred"
            });
        },
    )
  };
}





/* export function addQuickbookEntry(values) {
	return (dispatch) => {
    database.ref(`${calendarRoot}/${TMP_USER}`)
    .push(values)
    .then( snap => {
      database.ref(projectsRegsRoot).child('CICCIO').child(snap.getKey())
      .set(values)
      .then(
          // success
          () => {
              dispatch({
                  type: CALENDAR_ENTRY_ADD_SUCCESS,
                  payload: 'BABBODIMINCHIAAAAAAAA'
              });

          },
          error => {
              console.log('ERROR: ', error);
              dispatch({
                type: CALENDAR_ENTRY_ADD_ERROR,
                payload: 'ERROR!!!'
            });
          },
      )
      //callbackFunction();
    });  
  };
} */
