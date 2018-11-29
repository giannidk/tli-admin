import {
    FETCH_TEACHERS,   
    FETCH_TEACHERS_SUCCESS,
    FETCH_TEACHERS_ERROR, 
} from '../constants';

const INITIAL_STATE = {
    list: null,    
    error: null,
    loading: false
}

export default function ( state = INITIAL_STATE, action) {
    switch(action.type) {        
        case FETCH_TEACHERS:
            return { ...state, loading: true }; 
        case FETCH_TEACHERS_SUCCESS:
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
