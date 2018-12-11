import {
  database,
  calendarRoot,
  TMP_USER,
} from '../../app/config';

import {
    //CALENDAR_ENTRY_ADD,
    CALENDAR_ENTRY_ADD_SUCCESS,
    CALENDAR_ENTRY_ADD_ERROR,
} from '../types';

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
