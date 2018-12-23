import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { localizeReducer } from "react-localize-redux";
import CalendarReducer from './reducer_calendar';
import TeachersReducer from './reducer_teachers';
import AuthReducer from './reducer_auth';

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['auth']
}

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['signupError', 'loginError']
}

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
    auth: persistReducer(authPersistConfig, AuthReducer),
    form: formReducer
})

export default persistReducer(persistConfig, rootReducer)