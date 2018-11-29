import { toast } from "react-toastify";
import {
    CALENDAR_ENTRY_ADD_SUCCESS,
    CALENDAR_ENTRY_ADD_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    entries: {},    
    error: null,
    loading: false
}

export default function ( state = INITIAL_STATE, action) {
    switch(action.type) {        
        case CALENDAR_ENTRY_ADD_SUCCESS:
            toast.success(action.payload);
            return { ...state, success: action.payload }; ;   
        case CALENDAR_ENTRY_ADD_ERROR:
            toast.error(action.payload);
            return { ...state, error: action.payload }; ;           
        default:
            return state;
    }
}
