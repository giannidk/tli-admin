import {
    FETCH_REGISTRATIONS,
    FETCH_REGISTRATIONS_SUCCESS,
    FETCH_REGISTRATIONS_FAIL,
    FETCH_REGISTRATIONS_DETAILS,
    FETCH_REGISTRATIONS_DETAILS_SUCCESS,
    FETCH_REGISTRATIONS_DETAILS_FAIL,
    REGISTRATIONS_ADD,
    REGISTRATION_DELETE,

    FETCH_TEACHERS,   
    FETCH_TEACHERS_SUCCESS,
    FETCH_TEACHERS_ERROR, 
} from '../actions/types';

const INITIAL_STATE = {
    teachers: {},    
    error: null,
    loading: false
}

export default function ( state = INITIAL_STATE, action) {
    switch(action.type) {        
        case FETCH_TEACHERS:
            return { ...state, loading: true }; 
        case FETCH_TEACHERS_SUCCESS:
        console.log('TEACHERS: ', action.payload )
            return { ...state, list: action.payload, error: null, loading: false };
        case FETCH_TEACHERS_ERROR:
            return { ...state, error: action.error, loading: false };  
       /*  case FETCH_REGISTRATIONS_DETAILS:
            return { ...state, loading: true }; 
        case FETCH_REGISTRATIONS_DETAILS_SUCCESS:
            return { ...state, [action.key]: action.payload, loading: false };
        case FETCH_REGISTRATIONS_DETAILS_FAIL:
            return { ...state, error: action.error, loading: false }; 
        case REGISTRATIONS_ADD:
            return action.payload;   
        case REGISTRATION_DELETE:
            return action.payload;  */
        default:
            return state;
    }
}
