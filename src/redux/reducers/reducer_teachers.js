import { connect } from 'react-redux';
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
        default:
            return state;
    }
}
