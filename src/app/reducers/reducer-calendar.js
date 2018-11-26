import {
	FETCH_CALENDAR_EVENTS,
} from '../actions/types';

const INITIAL_STATE = {
    events: {},
    error: null,
	loading: false,
};

export default function (state = INITIAL_STATE, action) {
	console.log(action, state)
    switch(action.type){
        case FETCH_CALENDAR_EVENTS:
            return { ...state, list: action.payload, error: null, loading: false };  
        default: 
            return state;
    }
}