import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { localizeReducer } from "react-localize-redux";
import CalendarReducer from './reducer_calendar';
import TeachersReducer from './reducer_teachers';
import AuthReducer from './reducer_auth';

const rootReducer = combineReducers({
    appData: () => {
      return {
        "companyName": "The Freelancer",
        "companyAddress": "Nørre Voldgade 52, 2200 Købanhevn N",
        "companyCVR": "3811 3784",
        "VAT": "25",
        "currency": "DKK",
        "dateFormat": "DD-MM-YYYY" 
      }
    },
    localize: localizeReducer,
    calendar: CalendarReducer,
    teachers: TeachersReducer,
    auth: AuthReducer,
    form: formReducer
})

export default rootReducer;
