import {
	database,
  clientsRoot,
  clientsProjectsRoot
} from '../firebase';
import {
	FETCH_CLIENTS,
	FETCH_CLIENTS_SUCCESS,
	FETCH_CLIENTS_FAIL,
	ADD_CLIENT,
	CLIENT_DELETE,
  CLIENT_DETAILS,
  CLIENT_DETAILS_SUCCESS,
  CLIENT_DETAILS_FAIL
} from './types';

export function fetchClients() {
	return (dispatch) => {
		dispatch({
			type: FETCH_CLIENTS
		});
		database.ref(clientsRoot)
			.orderByChild("contactPerson")
			.once('value')
			.then(
				snapshot => {
					dispatch({
						type: FETCH_CLIENTS_SUCCESS,
						payload: snapshot.val()
					})
				},
				error => {
					dispatch({
						type: FETCH_CLIENTS_FAIL,
						error: 'There has been an error retieving the clients list!'
					})
				}
			);
	};
}

export function addClient(values, callbackFunction) {
	return (dispatch) => {
		database.ref(clientsRoot)
			.push(values)
			.then(() => {
				dispatch({
					type: ADD_CLIENT,
					payload: {}
				});
				callbackFunction();
			});
	};
}

export function clientDelete(id, callbackFunction) {
    return (dispatch) => {
         database.ref(`${clientsRoot}/${id}`)
            .remove()
            .then(() => {
				dispatch({ 
					type: CLIENT_DELETE,
					payload: id
				}); 
            callbackFunction();       
        }); 
    };
} 

export function clientDetails(key) {
	return (dispatch) => {
	dispatch({
			type: CLIENT_DETAILS
		});	
		// Fetching client's details
		database.ref(clientsRoot).child(key)
			.once('value', 
			// success
			snap => 
			{
				// Creating new container Objct
				let clientDetails = {...snap.val(), projects: {} };				
				 // Fetching all Client's Projects
				database.ref(clientsProjectsRoot).child(key)				
					.once('value')
					.then( snap => {
						clientDetails = { ...clientDetails, projects: snap.val()}
						dispatch({
							type: CLIENT_DETAILS_SUCCESS,
							key: key,
							payload: clientDetails
						}); 
					});
				   
			},
			// error
			error => {
				  dispatch({
					type: CLIENT_DETAILS_FAIL,
					error: 'There has been an error retieving the project!'
				})  
			}
		);

	};
};
