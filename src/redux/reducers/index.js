import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';
import ProjectsReducer from './reducer_projects';
import InvoicesReducer from './reducer_invoices';
import RegistrationsReducer from './reducer_registrations';
import CalendarReducer from './reducer_calendar';
import TeachersReducer from './reducer_teachers';

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
    clients: ClientsReducer,
    projects: ProjectsReducer,
    registrations: RegistrationsReducer,
    invoices: InvoicesReducer,
    calendar: CalendarReducer,
    teachers: TeachersReducer,
    form: formReducer
})

export default rootReducer;
