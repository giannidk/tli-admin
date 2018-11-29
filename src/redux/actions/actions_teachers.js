import { makeShortDate } from '../../helpers';
import {
  database,
  teachersRoot,
} from '../../firebase';

import {
    FETCH_TEACHERS,   
    FETCH_TEACHERS_SUCCESS,
    FETCH_TEACHERS_ERROR, 
} from '../constants';

 export function fetchTeachers() {
    return (dispatch) => {
        dispatch({
        type: FETCH_TEACHERS,
    });
        database.ref(teachersRoot)
        .once('value')
        .then(
            //success
            snapshot => {
                dispatch({
                    type: FETCH_TEACHERS_SUCCESS,
                    payload: snapshot.val()
                }); 
            },
            error => {
                dispatch({
                    type: FETCH_TEACHERS_ERROR,
					error: `An error has occurred, error code is: ${error.code}`,
                });
            }
        )
    }
} 
 
