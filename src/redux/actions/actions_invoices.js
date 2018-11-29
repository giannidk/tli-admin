import {
	database,
  registrationsRoot as regsRoot,
  invoicesRoot,
  projectsInvoicesRoot
} from '../../firebase';
import {
	SAVE_INVOICE,
  FETCH_INVOICES,
  FETCH_INVOICES_SUCCESS,
  FETCH_INVOICES_FAIL,
  FETCH_INVOICES_DETAILS,
  FETCH_INVOICES_DETAILS_SUCCESS,
  FETCH_INVOICES_DETAILS_FAIL
} from '../constants';


export function saveInvoice(values, callbackFunction) {
	return (dispatch) => {
    // Saving new Invoice in DB
		 database.ref(invoicesRoot)
			.push({ ...values, invoiceNumber: 'XXX'})
			.then( snap => {
        console.log(snap.getKey());
        database.ref(projectsInvoicesRoot).child(values.project).child(snap.getKey())
        .set(values.name)
        .then(
            // success
            () => {
              // Updating Registrations status in registrations 
               for (let reg in values.registrations) {
                 database.ref(regsRoot).child(reg)
                 .update({status: 'invoiced'})
                 .then(
                    success => {
                      dispatch({
                          type: SAVE_INVOICE,
                          payload: {}
                      });
                    },
                    error => {
                      console.log('Registrations could not be updated');
                    }
                 );
                  callbackFunction();
              } 
            },
            // error
            error => {
              console.log('Invoice could not be saved');
            }
        )				
				//callbackFunction();
			}); 
	};
}



export function fetchInvoices() {
    return (dispatch) => {
        dispatch({
        type: FETCH_INVOICES,
    });
        database.ref(invoicesRoot)
        .once('value')
        .then(
            //success
            snap => {
                dispatch({
                  type: FETCH_INVOICES_SUCCESS,
					        payload: snap.val()
                });
            },
            error => {
                dispatch({
                  type: FETCH_INVOICES_FAIL,
					        error: 'Invoices could not be retrieved!'
                });
            }
        )
    }
} 


export function invoiceDetails(key) {
	return (dispatch) => {
	dispatch({
			type: FETCH_INVOICES_DETAILS
		});	
		// Fetching registrations's details
		database.ref(invoicesRoot).child(key)
			.once('value', 
			// success
			snap => 
			{
				dispatch({
            type: FETCH_INVOICES_DETAILS_SUCCESS,
            key: key,
            payload: snap.val()
        }); 
				   
			},
			// error
			error => {
				  dispatch({
					type: FETCH_INVOICES_DETAILS_FAIL,
					error: 'There has been an error retieving the selected registration!'
				})  
			}
		);

	};
};
