import { 
    FETCH_PROJECTS,
	FETCH_PROJECTS_SUCCESS,
    FETCH_PROJECTS_FAIL,
    FETCH_PROJECT_DETAILS,
	FETCH_PROJECT_DETAILS_SUCCESS,
	FETCH_PROJECT_DETAILS_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
    projects: {},
    error: null,
    loading: false
};

export default function (state = INITIAL_STATE, action) {
    switch(action.type){
        case FETCH_PROJECTS:
            return { ...state, loading: true };  
        case FETCH_PROJECTS_SUCCESS:
            return { ...state, list: action.payload, error: null, loading: false };  
        case FETCH_PROJECTS_FAIL:
            return { ...state, error: action.error, loading: false };  
        case FETCH_PROJECT_DETAILS:
            return { ...state, loading: true };  
        case FETCH_PROJECT_DETAILS_SUCCESS:
            return { ...state, [action.key]: action.payload, error: null, loading: false };  
        case FETCH_PROJECT_DETAILS_FAIL:
            return { ...state, error: action.error, loading: false };  
        default: 
            return state;
    }
}
