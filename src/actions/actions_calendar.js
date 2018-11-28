import { makeShortDate } from '../helpers';
import {
  database,
  calendarRoot,
  registrationsRoot as regsRoot,
  projectsRegistrationsRoot as projectsRegsRoot
} from '../firebase';

import {
    CALENDAR_ENTRY_ADD,
} from './types';

export function addQuickbookEntry(values) {
	return (dispatch) => {
    database.ref(calendarRoot)
    .push({ ...values, user: 'XXX'})
    .then( snap => {
      database.ref(projectsRegsRoot).child('CICCIO').child(snap.getKey())
      .set(values)
      .then(
          // success
          () => {
              dispatch({
                  type: CALENDAR_ENTRY_ADD,
                  payload: 'BABBODIMINCHIAAAAAAAA'
              });

          },
          error => {
              console.log('ERROR: ', error);
          },
      )
      //callbackFunction();
    });  
  };
}
