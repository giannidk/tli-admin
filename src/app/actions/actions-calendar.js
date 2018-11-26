import {
	FETCH_CALENDAR_EVENTS,
} from './types';


export function fetchCalendarEvents() {
	return (dispatch) => {
		dispatch({
			type: FETCH_CALENDAR_EVENTS,
			payload: [],
		});
	};
}