import { combineReducers } from 'redux';
/* 
import { reducer as formReducer } from 'redux-form';
import ClientsReducer from './reducer_clients';
import ProjectsReducer from './reducer_projects';
import InvoicesReducer from './reducer_invoices';
*/
import CalendarReducer from './reducer-calendar';
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
    calendar: CalendarReducer,
   /*  
    projects: ProjectsReducer,
    registrations: RegistrationsReducer,
    invoices: InvoicesReducer,
    form: formReducer */
})

export default rootReducer;